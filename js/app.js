var content = [
    {
        "title": "EPFO",
        "description": "Track your Employee Provident Fund",
        "url": "https://www.epfindia.gov.in/site_en/index.php",
        "tags": ["epfo", "provident", "fund"]
    },
    {
        "title": "IRCTC",
        "description": "Indian Railway ticket bookings",
        "url": "https://www.irctc.co.in",
        "tags": ["railway", "ticket", "booking"]
    }
]

var app = new Vue({
    el: '#app',
    data: {
        searchValue: '',
        listItems: content
    },
    methods: {
        SearchFilter: function(){
            let searchText = this.searchValue.toLowerCase();
            if (searchText == ""){
                this.listItems = content
            }
            else{
                this.listItems = content.filter((item) => {

                    let foundFlag = false;

                    item.tags.map((tag) => {
                        if (tag.indexOf(searchText) >= 0){
                            foundFlag = true;
                        }
                    })
                    return foundFlag;
                });
            }
        }
    }
})
