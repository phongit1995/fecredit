const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const TIME_CACHE = 5*60*1000 ;
const setCache = (key,val,time=TIME_CACHE)=>{
    myCache.set(key,val,TIME_CACHE);
}
const getCache = (key)=>{
    return myCache.get(key);
}
module.exports ={
    setCache:setCache,
    getCache:getCache
}