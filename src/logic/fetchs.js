
export function PromiseFetchGET(url) {
    
    return new Promise((resolve, reject) => {
    let data = null
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        data=json
      })
    .finally(() =>{
        resolve(data)
    });
}, []);

  }

export function PromiseFetchPOST(url, newData) {

    return new Promise((resolve, reject)=> {
     let data = null
    fetch(url, {method:"POST", headers: {
        'Content-Type': 'application/json'},body: JSON.stringify(newData)})
        .then((response) => response.json())
        .then((json) => {
        data=json
      })
    .finally(() =>{
        resolve(data)
    })
}
    )

}

export function PromiseFetchPUT(url, newData) {

    return new Promise((resolve, reject)=> {
     let data = null
    fetch(url, {method:"PUT", headers: {
        'Content-Type': 'application/json'},body: JSON.stringify(newData)})
        .then((response) => response.json())
        .then((json) => {
        data=json
      })
    .finally(() =>{
        resolve(data)
    })
}
    )

}


