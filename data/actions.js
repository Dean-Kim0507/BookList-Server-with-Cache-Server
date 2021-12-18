import fetch from "node-fetch";

// export const pingAction = async () => {
//     let data;
//     try {
//         const response = await fetch('https://api.hatchways.io/assessment/blog/posts/tag=tech')
//         data = await response.json();
//         if (data.error) throw data.error;
//     } catch (error) {
//         throw error
//     }
//     return data;
// }


export const postAction = async () => {
    let data = [];
    let tags;
    let sortBy;
    let direction;
    let url = 'https://api.hatchways.io/assessment/blog/posts?';
    try {
        let param = 'tags=history,tech&sortBy=likes&direction = desc';
        let params = param.split('&');

        //get params
        for (let _item of params) {
            if (_item.indexOf('tags') !== -1) {
                tags = _item.split('=')[1].split(',');
            } else if (_item.indexOf('sortBy') !== -1) {
                let sortByItems = _item.split('=');
                if (sortByItems[1] === 'id'
                    || sortByItems[1] === 'reads'
                    || sortByItems[1] === 'likes'
                    || sortByItems[1] === 'popularity')
                    sortBy = sortByItems[1];
                //sortBy Error handling
                else throw "sortBy parameter is invalid";
            } else if (_item.indexOf('direction') !== -1) {
                let directionItems = _item.split('=');
                direction = directionItems[1];
            }
        }
        console.log(tags, sortBy, direction)

        //Fetch concurrently
        if (tags) {
            let urls = [];
            for (let _tag of tags) urls.push(url + "tag=" + _tag);
            console.log(urls)
            let tagData = await Promise.all(
                urls.map(
                    url =>
                        fetch(url).then(
                            (response) => response.json()
                        )));
            //remove repeat
            for (let _tagData of tagData) {
                let tagDatas = _tagData.posts;
                for (let _tagDatas of tagDatas) {
                    data.push(_tagDatas);
                }
            }
            data = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
        }

        //Sorting
        if (sortBy) {
            if (direction.indexOf('asc') !== -1) {
                data = data.sort(function (a, b) {
                    return a[sortBy] - b[sortBy];
                });

            } else if (direction.indexOf('desc') !== -1) {
                data = data.sort(function (a, b) {
                    return b[sortBy] - a[sortBy];
                });
            }
        }
    } catch (error) {
        throw error
    }
    console.log(data.length);
    return data;
}