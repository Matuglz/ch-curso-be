import { ListObjectsCommand, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { S3Client } from "@aws-sdk/client-s3";
import { productsService } from "../service/products.service.js";
import { AWS_REGION, AWS_S3_OR, AWS_S3_OR_SECRET_KEY, AWS_SECRET_KEY,AWS_API_KEY } from "../config/config.js";

const s3FullAccess = new S3Client({
    credentials: {
        accessKeyId: AWS_API_KEY,
        secretAccessKey: AWS_SECRET_KEY
    },
    region: AWS_REGION
})

//Subir imagen a s3 y hacer push del link al array del producto en mongo
export async function subirArchivo(req, newProduct) {
    try {
        const s3FullAccess = new S3Client({
            credentials: {
                accessKeyId: AWS_API_KEY,
                secretAccessKey: AWS_SECRET_KEY
            },
            region: AWS_REGION
        })

        const quantity = await s3FullAccess.send(new ListObjectsCommand({ Bucket: 'productos-be-coderhouse', Prefix: newProduct.id })) || []

        const key = `${newProduct._id}/${quantity != undefined ? 1 : quantity.content.length + 1}`
        
        const params = {
            Bucket: 'productos-be-coderhouse',
            Key: key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        const command = new PutObjectCommand(params)
        await s3FullAccess.send(command)
        const s3OnlyRead = new S3Client({
            credentials: {
                accessKeyId: AWS_S3_OR,
                secretAccessKey: AWS_S3_OR_SECRET_KEY
            },
            region: AWS_REGION
        })

        const data = await s3OnlyRead.send(new ListObjectsV2Command({ Bucket: 'productos-be-coderhouse', Prefix: newProduct.id }))
        const clave = data.Contents.map((o) => o.Key)
        const url = `https://productos-be-coderhouse.s3.${AWS_REGION}.amazonaws.com/${clave}`;
        await productsService.updateImgURL(newProduct._id, url)
    }
    catch (error) {
        throw new error(error.message)
    }
}


//Borrar imagen vieja de la carpeta de s3 y del array del producto y enviar la nueva

// export async function updateImgS3(req,oldProduct, newProduct) {


//         const quantity = await s3FullAccess.send(new ListObjectsCommand({ Bucket: 'productos-be-coderhouse', Prefix: newProduct.id })) || []

//         const key = `${newProduct._id}/${quantity != undefined ? 1 : quantity.content.length + 1}`

//         const params = {
//             Bucket: 'productos-be-coderhouse',
//             Key: key,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype
//         }

//         const command = new PutObjectCommand(params)
//         await s3FullAccess.send(command)

//         const s3OnlyRead = new S3Client({
//             credentials: {
//                 accessKeyId: AWS_S3_OR,
//                 secretAccessKey: AWS_S3_OR_SECRET_KEY
//             },
//             region: AWS_REGION
//         })

//         const data = await s3OnlyRead.send(new ListObjectsV2Command({ Bucket: 'productos-be-coderhouse', Prefix: newProduct.id }))
//         const clave = data.Contents.map((o) => o.Key)
//         const url = `https://productos-be-coderhouse.s3.${AWS_REGION}.amazonaws.com/${clave}`;
//         await productsService.updateImgURL(newProduct._id, url)

//     }



//Borrar carpeta de s3

// export async function deleteS3Folder(id){
    
//     try{
//         const s3FullAccess = new S3Client({
//             credentials: {
//                 accessKeyId: AWS_API_KEY,
//                 secretAccessKey: process.env.AWS_SECRET_KEY
//             },
//             region: process.env.AWS_REGION
//         })
//         console.log(id);
//         await s3FullAccess.send(new DeleteObjectCommand({Bucket: 'productos-be-coderhouse', Key: `${id}/`}))
//         console.log('carpeta eliminada');
//     }catch{
//         console.log('object');
//     }}


