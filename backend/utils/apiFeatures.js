class APIFeatures{
    constructor(query, queryStr){
        this.query = query; // The Product Model
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            productName:{
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter(){
        const queryCopy = { ...this.queryStr }
        const removeFields = ["keyword", "limit", "page"] // Remove fields from the query
        removeFields.forEach(e => delete queryCopy[e]);

        let queryFilter = JSON.stringify(queryCopy);
        queryFilter = queryFilter.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryFilter));
        return this;
    }
    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage -1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
module.exports = APIFeatures