import React from 'react';

import { Chart } from 'react-charts';

const PostsGraph = (props) => {
    console.log('posts', props.posts);
    let data = {};

    props.posts.forEach((post) => {
        let postDate = new Date(post.dateAdded);
        postDate = `${
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][postDate.getMonth()]
        } ${postDate.getDay()} ${postDate.getFullYear()}`;
        console.log('PostsGraph -> postDate', postDate);
        if (Object.keys(data).includes(postDate)) {
            data[postDate] = data[postDate] + 1;
        } else {
            data[postDate] = 1;
        }
    });
    console.log('data', data);
    console.log('datakeys', Object.keys(data));

    const graphData = [{label: 'Sat', data: 3}]
    const axes = { primary: true, type: 'linear', position: 'bottom' }

    return (
    <div style={{ width: '300px', height: '300px' }}>
        <Chart data={graphData} axes={axes} />
    </div>
    );
};

//     const { data, randomizeData } = useChartConfig({
//         series: 10,
//         dataType: 'ordinal',
//     });
//     const series = React.useMemo(
//         () => ({
//             type: 'bar',
//         }),
//         []
//     );
//     const axes = React.useMemo(
//         () => [
//             { primary: true, type: 'ordinal', position: 'left' },
//             { position: 'bottom', type: 'linear', stacked: true },
//         ],
//         []
//     );
//     return (
//         <>
//             <Chart data={data} series={series} axes={axes} tooltip />
//         </>
//     );
// };

// const PostsGraph = () => {
//     return (
//         <div>
//             Look at this graaaaph
//         </div>
//     )
// }

export default PostsGraph;
