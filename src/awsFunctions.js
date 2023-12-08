import { ListObjectsCommand, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { S3Client } from "@aws-sdk/client-s3";
import { config as configDotenv } from "dotenv";
import { productsManager } from "../db/mainDB.js";
configDotenv()
const s3FullAccess = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_API_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION
})

//Subir imagen a s3 y hacer push del link al array del producto en mongo
export async function subirArchivo(req, newProduct) {
    try {
        const s3FullAccess = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_API_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            },
            region: process.env.AWS_REGION
        })

        const quantity = await s3FullAccess.send(new ListObjectsCommand({ Bucket: 'productos-be-coderhouse', Prefix: newProduct.id })) || []

        const key = `${newProduct.id}/${quantity != undefined ? 1 : quantity.content.length + 1}`

        const params = {
            Bucket: 'productos-be-coderhouse',
            Key: key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        const command = new PutObjectCommand(params)
        console.log(newProduct);
        await s3FullAccess.send(command)
        console.log('archivo subido');
        console.log(newProduct);

        const s3OnlyRead = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_S3_OR,
                secretAccessKey: process.env.AWS_S3_OR_SECRET_KEY
            },
            region: process.env.AWS_REGION
        })

        const data = await s3OnlyRead.send(new ListObjectsV2Command({ Bucket: 'productos-be-coderhouse', Prefix: newProduct.id }))
        const clave = data.Contents.map((o) => o.Key)
        const url = `https://productos-be-coderhouse.s3.${process.env.AWS_REGION}.amazonaws.com/${clave}`;
        await productsManager.updateOne({ _id: newProduct.id }, { $push: { thumbnail: url } })
        console.log(newProduct);
    }
    catch (error) {
        console.error('error', error);
    }
}


//Borrar imagen vieja de la carpeta de s3 y del array del producto y enviar la nueva

export async function updateImgS3(req, oldProduct, newProduct) {

    try {
        await s3FullAccess.send(new DeleteObjectCommand({ Bucket: 'productos-be-coderhouse', Key: `productos-be-coderhouse/${oldProduct._id}/1` })) }
     catch {
            console.error('no existe la carpeta');
        }
        await productsManager.updateOne({ _id: req.body.id }, { $set: { thumbnail: [] } })

        const quantity = await s3FullAccess.send(new ListObjectsCommand({ Bucket: 'productos-be-coderhouse', Prefix: newProduct.id })) || []

        const key = `${newProduct.id}/${quantity != undefined ? 1 : quantity.content.length + 1}`

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
                accessKeyId: process.env.AWS_S3_OR,
                secretAccessKey: process.env.AWS_S3_OR_SECRET_KEY
            },
            region: process.env.AWS_REGION
        })

        const data = await s3OnlyRead.send(new ListObjectsV2Command({ Bucket: 'productos-be-coderhouse', Prefix: newProduct.id }))
        const clave = data.Contents.map((o) => o.Key)
        const url = `https://productos-be-coderhouse.s3.${process.env.AWS_REGION}.amazonaws.com/${clave}`;
        await productsManager.updateOne({ _id: newProduct.id }, { $push: { thumbnail: url } })

    }



//Borrar carpeta de s3

// export async function deleteS3Folder(id){
    
//     try{
//         const s3FullAccess = new S3Client({
//             credentials: {
//                 accessKeyId: process.env.AWS_API_KEY,
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


