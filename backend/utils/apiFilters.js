class APIFilters{
  constructor(query, queryStr){
    this.query = query;
    this.queryStr = queryStr
  }
  search(){
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: "i"
      }
    } : {};

    this.query = this.query.find({ ...keyword })
    return this
  }
  filter(){
    const queryCopy = { ...this.queryStr }
    const removeFields = ["keyword", "limit", "page"]
    removeFields.forEach((e) => delete queryCopy[e]);

    // Filtering for price, rating, etc...
    let queryFilter = JSON.stringify(queryCopy);
    queryFilter = queryFilter.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

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

export default APIFilters;