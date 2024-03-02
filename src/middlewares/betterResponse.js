export function betterResponse(req, res, next) {
    res['created'] = (payload) => {
      res.status(201).json({ status: 'success', payload })
    }
    res['result'] = (payload) => {
      res.status(200).json({ status: 'success', payload })
    }
    res['deleted'] = ()=>{
      res.status(204).json({status:'success deleted'})
    }
    res['updated']=()=>{
      res.status(201).json({status: 'success updated'})
    }
    res['loged']=()=>{
      res.status(204).json({status:'login success'})
    }
    res['logout']=()=>{
      res.status(204).json({status:'logout success'})
    }
    res['bought']=()=>{
      res.status(201).json({status:'remove stock success'})
    }
    res['authenticated']=()=>{
      res.status(201).json({status:'success authenticated'})
    }
    res['EmailSent']=()=>{
      res.status(201).json({status:'email success sent'})
    }
    next()
  }