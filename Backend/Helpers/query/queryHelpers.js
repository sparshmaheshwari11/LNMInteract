
//searchHelper applies search criteria to the query using the searchHelper function. 
//It checks if the req.query.search parameter is present in the request. 
//If it is, it modifies the query to include search criteria based on the title.
const searchHelper = (searchKey, query, req) => {

    if (req.query.search) {

        const searchObject = {};

        const regex = new RegExp(req.query.search, "i")
        //regex expression for case insensitive search

        searchObject[searchKey] = regex

        query = query.where(searchObject);
      
        return query
    }

    return query;
}


const paginateHelper = async (model ,query ,req)=> {

    const page = parseInt( req.query.page ) || 1 ; 
    const pageSize = parseInt( req.query.limit ) || 6 ; 

    const skip  = (page-1 ) * pageSize ; //kitna data skip krna h
   
    const regex = new RegExp(req.query.search, "i")    

    const total = await model.countDocuments({"title" : regex})
  
    const pages = Math.ceil(total / pageSize )  ;

    query = query.skip(skip).limit(pageSize) ; //skip functionality provided by mongoose

    return {
        query : query,
        page : page,
        pages : pages  
    }

}


module.exports ={
    searchHelper,
    paginateHelper
}