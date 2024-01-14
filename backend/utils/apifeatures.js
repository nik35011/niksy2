class Apifeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }

    //search feature of api
    search(){
        const keyword=this.querystr.keyword ?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i"
            }
        }:{};

        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const quercopy={...this.querystr};
         
        //removing some feilds from category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>{
            delete quercopy[key];
        });

        //Filter for price rating 

        
        let querystr=JSON.stringify(quercopy);
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
       
        this.query=this.query.find(JSON.parse(querystr));
        
        return this;
    }



    // pagination for pages
    pagination(resultperpage){
        
        const currentpage=Number(this.querystr.page)||1;

        const skip=resultperpage*(currentpage-1);
        this.query=this.query.limit(resultperpage).skip(skip);
        return this;
    }
}

module.exports=Apifeatures