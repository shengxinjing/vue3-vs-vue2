

// web-worker
self.importScripts('spark-md5.min.js')

self.onmessage = e=>{
    // 接受主线程的通知
    const {chunks} = e.data
    const spark = new self.SparkMD5.ArrayBuffer()
    let progress = 0
    let count = 0
    
    const loadNext = index=>{
        const reader = new FileReader()
        reader.readAsArrayBuffer(chunks[index].file)
        reader.onload = e=>{
            // 累加器 不能依赖index，
            count++
            // 增量计算md5
            spark.append(e.target.result)
            if(count===chunks.length){
                // 通知主线程，计算结束
                self.postMessage({
                    progress:100,
                    hash:spark.end()
                })
            }else{
                // 每个区块计算结束，通知进度即可
                progress += 100/chunks.length
                self.postMessage({
                    progress
                })
                // 计算下一个
                loadNext(count)
            }
        }
    }
    // 启动
    loadNext(0)


}