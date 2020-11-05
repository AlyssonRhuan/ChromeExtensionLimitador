document.addEventListener('DOMContentLoaded', function() {
    
    let qtdTabs = 0;
    listAllTabs();      
    createEventCloseTab();
    createEventActiveTab();
    createEventeMute();
    createEventeUnmute();
    document.querySelector('#btnLimit').addEventListener('click', function() {
        document.querySelector('#testelimite').innerHTML = document.querySelector('#qtdTabs').value;
    }) 

    function createEventCloseTab(){
        chrome.tabs.getAllInWindow(function(Alltabs) {
            Alltabs.map((tab, key) => {
                document.querySelector('#closeTab' + tab.id).addEventListener('click', function() {
                    chrome.tabs.remove(tab.id);
                });     
            })
        });
    }

    function createEventActiveTab(){
        chrome.tabs.getAllInWindow(function(Alltabs) {
            Alltabs.map((tab, key) => {      
                document.querySelector('#activeTab' + tab.id).addEventListener('click', function() {
                    chrome.tabs.highlight({
                            tabs: tab.index
                        }, 
                        function () {}
                    );
                });      
            })
        });
    }

    function createEventeMute(){
        chrome.tabs.getAllInWindow(function(Alltabs) {
            Alltabs.map((tab, key) => {
                document.querySelector('#muteTab' + tab.id).addEventListener('click', function() {
                    console.log('#muteTab' + tab.id);
                    chrome.tabs.update(tab.id, {
                        muted: true
                    },
                    function () {}
                    );
                });                   
            })
        });
    }

    function createEventeUnmute(){
        chrome.tabs.getAllInWindow(function(Alltabs) {
            Alltabs.map((tab, key) => {
                // document.querySelector('#unmuteTab' + tab.id).addEventListener('click', function() {
                    console.log('#unmuteTab' + tab.id);
                //     chrome.tabs.update(tab.id, {
                //         muted: false
                //     },
                //     function () {}
                //     );
                // });                   
            })
        });
    }

    function listAllTabs(){
        chrome.tabs.getAllInWindow(function(Alltabs) {
            Alltabs.map((tab, key) => {
                let tr = ""+
                "<tr>" +
                    "<td class='tabIcon'><img src=\"" + tab.favIconUrl + "\"/></td>" +
                    "<td class='activeTab' id='activeTab" + tab.id + "'>" + tab.title + "</td>";

                if(tab.audible){
                    if(tab.mutedInfo.muted){
                        tr += "<td class='audioTab' id='unmuteTab" + tab.id + "'><img src=\"assets/mute.png\"/></td>"
                    }
                    else{
                        tr += "<td class='audioTab' id='muteTab" + tab.id + "'><img src=\"assets/audio.png\"/></td>"
                    }
                }
                else{
                    tr += "<td></td>"
                }

                tr += "" +
                    "<td class='closeTab' id='closeTab" + tab.id + "'><img src=\"assets/close.png\"/></td>" +
                "</tr>";
                document.querySelector('#myTabs').innerHTML += tr;
                document.querySelector('#qtdTabs').value++;
            })
        }); 
    }
})