//importScripts('./utilities/idb.js') ;
//importScripts('./utilities/idbUtilities.js') ;
let STATIC_CACHE = 'static-v7' ;
let DYNAMIC_CACHE = 'dynamic-v6' ;
let offlineFallback = './404.html' ;
let dynamicCacheMaxItems = 30 ;
//let syncUserTable = 'sync-userTable' ;
//let syncUserTag = 'sync-userData'
let cacheThenNetworkURLs = [ //urls that contains dynamic data
    //'https://jsonplaceholder.typicode.com/users'
] 
let staticCachingAssets = [
    //html files 
    //for webpack/non-webpack version : (beside sw.js file)
    // offlineFallback ,
    // '/',
    '/about.html',
    // '/basket.html',
    // '/faq.html',
    // '/guide.html',
    // '/index.html',
    // '/orders.html',
    // '/product.html',
    // '/products.html',
    // '/rules.html',
    //css files 
        //for webpack version : (beside sw.js and just final bundle)
    // '/404.css',
    // '/about.css',
    // '/basket.css',
    // '/faq.css',
    // '/guide.css',
    // '/index.css',
    // '/orders.css',
    // '/product.css',
    // '/products.css',
    // '/rules.css',
        //for non-webpack version : (inside their own folder and separate files not bundles)
    // './404/styles/404.css',
    // './about/styles/about.css',
    // './basket/styles/basket.css',
    // './basket/styles/menu.css',
    // './faq/styles/faq.css',
    // './guide/styles/guide.css',
    // './index/styles/articles.css',
    // './index/styles/discounts.css',
    // './index/styles/features.css',
    // './index/styles/footer.css',
    // './index/styles/header.css',
    // './index/styles/nav.css',
    // './index/styles/products.css',
    // './index/styles/topMenu.css',
    // './index/styles/twoDirSlider.css',
    // './orders/styles/orders.css',
    // './product/styles/breadcrumbs.css',
    // './product/styles/productInfo.css',
    // './product/styles/suggestions.css',
    // './products/styles/currFilters.css',
    // './products/styles/filters.css',
    // './products/styles/products.css',
    // './products/styles/sort.css',
    // './products/styles/wrapper.css',
    // './rules/styles/rules.css',
    //js files
        //for webpack version : (beside sw.js and just final bundle)
    // '/basket.js',
    // '/faq.js',
    // '/index.js',
    // '/orders.js',
    // '/product.js',
    // '/products.js',
        //for non-webpack version : (inside their own folder and separate files not bundles)
    // './basket/scripts/basket.js',
    // './basket/scripts/menu.js',
    // './faq/scripts/faq.js',
    // './index/scripts/discounts.js',
    // './index/scripts/nav.js',
    // './index/scripts/products.js',
    // './index/scripts/topMenu.js',
    // './index/scripts/twoDirSlider.js',
    // './orders/scripts/orders.js',
    // './product/scripts/productInfo.js',
    // './products/scripts/filters.js',
    // './products/scripts/products.js',
    // './products/scripts/ranger.js',
    // './products/scripts/sort.js',
    // //utilities
        //for webpack version all will be bundle to final .css,.js files 
        //for non-webpack version : (inside their own folder and separate files not bundles)
    // './init.css' ,
    // './framework.css',
    // './utilities/styles/form.css',
    // './utilities/utilities.js' ,
    // './utilities/scripts/collapse.js' ,
    // './utilities/scripts/filters.js' ,
    // './utilities/scripts/form.js' ,
    // './utilities/scripts/nav.js' ,
    // './utilities/scripts/productSlider.js' ,
    // './utilities/scripts/table.js' ,
    // './utilities/scripts/timeline.js' ,
    // './utilities/scripts/twoDirSlider.js' ,
    //assets
        //for webpack/non-webpack version : (beside sw.js file inside assets folder)
    // '/assets/icons/checkout.png' ,
    // '/assets/icons/gurantee.png' ,
    // '/assets/icons/logo-144x144.png' ,
    // '/assets/icons/logo.png' ,
    // '/assets/icons/namad.png' ,
    // '/assets/icons/return.png' ,
    // '/assets/icons/support.png' ,
    // '/assets/svgs/404.svg'
] ;
function trimCache(cacheName,maxItems){
    caches.open(cacheName)
    .then(cache=>{
        cache.keys()
        .then(keys=>{
            if(keys.length>maxItems){
                cache.delete(keys[0])
                .then(()=>trimCache(cacheName,maxItems))
                .catch(msg=>console.error(msg)) ;
            }
        })
        .catch(msg=>console.error(msg)) ;
    })
    .catch(msg=>console.error(msg)) ;
}
self.addEventListener('install',function(evt){
    console.log('sw has been installed',evt) ;
    evt.waitUntil(
        caches.open(STATIC_CACHE)
        .then(cache=>cache.addAll(staticCachingAssets))
        .catch(msg=>console.error(msg))
    )  
});
self.addEventListener('activate',function(evt){
    console.log('sw has been activated',evt) ;
    evt.waitUntil(
        caches.keys()
        .then(keys=>{
            return Promise.all(keys.filter(key=>{
                if(key!=STATIC_CACHE && key!=DYNAMIC_CACHE) return caches.delete(key) ;
            }))     
        })
        .catch(msg=>console.error(msg))
    )
    return self.clients.claim() ; 
});
self.addEventListener('fetch',function(evt){
    let approach = 'cache-with-network-fallback' ; 
    for(let i=0;i<cacheThenNetworkURLs.length;i++){
        let url = cacheThenNetworkURLs[i] ;
        if(url==evt.request.url){
            approach = 'cache-then-network' ;
            break ;
        }
    }
    switch(approach){
        case 'cache-with-network-fallback' :
            evt.respondWith(
                caches.match(evt.request)
                .then(cacheRes=>{
                    if(cacheRes) return cacheRes ; //find inside cache         
                    else { //not find inside cache 
                        return fetch(evt.request)
                        .then(fetchRes=>{ //have net access
                            return caches.open(DYNAMIC_CACHE)   
                            .then(cache=>{
                                trimCache(DYNAMIC_CACHE,dynamicCacheMaxItems) ;
                                cache.put(evt.request.url,fetchRes.clone()) ;
                                return fetchRes ;
                            })     
                            .catch(msg=>console.error(msg)) ;  
                        })
                        .catch(msg=>{//does not have net access
                                return caches.open(STATIC_CACHE)
                                .then(cache=>{
                                    return cache.match(offlineFallback)
                                    .then(offlineRes=>{
                                        if(evt.request.headers.get('accept').includes('text/html')){
                                            return offlineRes ;
                                        }
                                    })
                                })
                                .catch(msg=>console.error(msg)) 
                        }) ;
                    }
                })
            )              
            break ;
        case 'cache-then-network' :
            evt.respondWith(
                fetch(evt.request)
                .then(fetchRes=>{
                    let cloneRes = fetchRes.clone() ;
                    cloneRes.json()
                    .then(dataArray=>{
                        return indexDbClear('users')
                        .then(()=>dataArray.forEach(data=>{
                            indexDbWrite('users',data)
                        }))
                    })
                    .catch(msg=>console.error(msg)) ;
                    return fetchRes ;
                })
                .catch(msg=>console.error(msg)) 
            ) ;      
            break ;
        default :
            console.error(`there is no corresponding approach for ${evt.request.url}`) ;
    }
})
// self.addEventListener('sync',e=>{
//     switch(e.tag){
//         case syncUserTag:
//             e.waitUntil(
//                 indexDbReadAll(syncUserTable)
//                 .then(dataArray=>{
//                     dataArray.forEach(data=>{
//                         //for each row inside indexDB's table related to current sync
//                         //we need to send that data from indexDB to server when we have net 
//                         fetch('https://jsonplaceholder.typicode.com/users',{
//                             method: 'post',
//                             header:{
//                                 'Content-Type': 'application/json',
//                                 'Accept': 'application/json'
//                             },
//                             body: JSON.stringify({
//                                 id: data.id,
//                                 name: data.name ,
//                                 imgSrc: data.imgSrc
//                             })
//                         })
//                         .then(res=>{
//                             if(res.ok){
//                                 console.log(`${data.id} gets deleted from indexDB`)
//                                 indexDbDelete(syncUserTable,data.id) ;
//                                 //above line in incorrect because we always get latest 'id' not target id 
//                                 //because forEach is sync but we remove from indexDB inside async block
//                                 //we should read 'id' directly from server 
//                                 //we should not call clearCards() or createCards(imgSrc,text) inside sw
//                                 //because we don't have access to DOM here 
//                             }
//                         })
//                         .catch(msg=>console.error(msg)) ;
//                     })
//                 })  
//                 .catch(msg=>console.error(msg)) 
//             );
//             break ;
//         default :
//             console.error('we dont have corresponding tag related to current "sync" event') ;
//     }
// });
// self.addEventListener('notificationclick',e=>{
//     let notification = e.notification ;
//     switch(e.action){ 
//         case 'confirm':
//             e.waitUntil(
//                 clients.matchAll()
//                 .then(clis=>{
//                     let client = clis.find(c=>c.visibilityState=='visible')
//                     if(client){
//                         client.navigate('http://127.0.0.1:3500/src/form.html') ;
//                         client.focus() ;
//                     } 
//                     else client.openWindow('http://127.0.0.1:3500/src/about.html') ;
//                 })
//             )     
//             notification.close() ;
//             break ;
//         case 'cancel':
//             console.log('click on cancel',notification) ;
//             notification.close() ;
//             break ;
//         default :
//             console.error('action is not handled inside notificationclick event')
//     }
// })
// self.addEventListener('notificationclose',e=>{
//     console.log(`user close the ${e.notification}`)
// })
// self.addEventListener('push',e=>{
//     let data = null ;
//     if(e.data) data = JSON.parse(e.data.text()) ; //second arg of webpush.sendNotification 
//     let notificationConfig = {
//         body: data.content ,
//         icon: '/src/assets/icons/icon-96x96.png'
//     };
//     e.waitUntil(
//         //self is sw itself ... we cant show notification just with this
//         //self.registration is part of sw that is connected to browser 
//         self.registration.showNotification(data.title,notificationConfig) 
//     )
// })

