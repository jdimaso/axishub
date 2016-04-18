// Change Image

function changeImage() {
    
    var str = document.getElementById("imgClickAndChange").src;
    var patt = new RegExp("sort.png");
    var res = patt.test(str);
    
    if (res) 
    {
        document.getElementById("imgClickAndChange").src = "images/sortup.png";
    }
    else 
    {
        document.getElementById("imgClickAndChange").src = "images/sort.png";
    }
}



// QSOCKS Connections

    var config = {
        host: 'localhost',
        isSecure: false
    };

    // qsocks.Connect(config).then(function(global) {
    //     console.log(global)
    // });
    qsocks.Connect(config).then(function(global) {
        global.getDocList().then(function(docList) {
            docList.forEach(function(doc) {
                //  console.log(doc);
            });
        });
    });
    qsocks.Connect(config).then(function(getdocs) {
        getdocs.getDocList().then(function(docList) {
            var docnames = [];
            var docid = [];
            var description = [];
            var reload = [];
            var hostname = "http://"+config.host;
            docList.forEach(function(doc) {
                docnames.push(doc.qDocName);
                docid.push(doc.qDocId);
                description.push(doc.qMeta.description);
                reload.push(doc.qLastReloadTime);
            });
            for (var d in docnames) {
                var newarticle = document.createElement('article')
                newarticle.className = "post";
                var newheader = document.createElement('header')
                var newdiv = document.createElement('div')
                newdiv.className = "title"; newdiv.id = "main";
                newdiv.innerHTML = "<h2> <a target=\"_blank\" href=" + hostname + "/sense/app/" + docid[d] + ">" + docnames[d] + "</a></h2>";
                var newpar = document.createElement('p')
                var text = document.createTextNode(description[d])
                newpar.appendChild(text)
                newdiv.appendChild(newpar)
                newheader.appendChild(newdiv)
                newarticle.appendChild(newheader)
                var maintag = document.getElementById("main")                
                maintag.appendChild(newarticle)
                var newdiv2 = document.createElement('div')
                newdiv2.className = "meta";
                var newtime = document.createElement('time')
                newtime.className = "published";
                var newdate = new Date(Date.parse(reload[d])).toDateString();
                newtime.innerHTML = newdate;
                newheader.appendChild(newdiv2);
                newdiv2.appendChild(newtime);
                var newimg = document.createElement('a')
                newimg.className = "author";
                newimg.innerHTML = "<a target=\"_blank\" href=" + hostname + "/sense/app/" + docid[d] + "> <img src='images/Qlik_default_qlikcircles.png' alt ='' /></a>";
                newdiv2.appendChild(newimg)
                // var newarticle = document.createElement('article')
                // newarticle.className = "post";
                // newarticle.innerHTML = "<header><div class='title'><h2><a href=" + hostname + "/sense/app/" + docid[d] + ">" + docnames[d] + "</a></h2><p>" + description[d] + "</p><div><div class='meta'><time class='published'>" + Date(Date.parse(reload[d])).toDateString() + "</time><a href=" + hostname + "/sense/app/" + docid[d] + "> <img src='images/Qlik_default_qlikcircles.png' alt ='' /></div></header>";
                // var apploc = document.getElementById("main")
                // apploc.appendChild(newarticle);
            }
        });
    });

    qsocks.Connect(config).then(function(global) {
        global.getStreamList().then(function(streamList) {
            // streamList.forEach(function(streams) {
                var snames = [];
                var sid = [];
                var sdescription = [];
                streamList.forEach(function(streamList) {
                snames.push(streamList.qName);
                sid.push(streamList.qId);
                sdescription.push(streamList.privileges);
                });
                for (var s in snames) {
                    var newstream = document.createElement('li')
                    newstream.innerHTML ="<article><header><h3><a href='" + sid[s] + "'>" + snames[s] + "</a></h3> <time class='published'>" + sdescription[s].join() + "</time></header><a href='"+ sid[s] + "' class='image'><img src='images/Qlik_default_qlikcircles.png' alt='' /></a></article>";
                    var streamloc = document.getElementById("streams")
                    streamloc.appendChild(newstream)
                }
        });
    });
    
   