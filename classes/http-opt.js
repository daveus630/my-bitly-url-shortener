module.exports = {
    group : () => {
        let group = {
            "url"       :        "",
            "hostname"  :        "",
            "method"    :        "",
            "headers"   :       {
               "Authorization"  : "",
               "Accept"         : ""
            }   
        }
        return group;
    },
    shorten : () => {
        let shorten = {
            "url"       :        "",
            "hostname"  :        "",
            "method"    :        "",
            "json"      :       {
                "long_url"      : "",
                "group_guid"    : ""
             },
            "headers"   : {     
               "Authorization"  : "",
               "Content-Type"   : ""
            }  
        }
        return shorten;
    }
    
}
