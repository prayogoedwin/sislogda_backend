import fetch from 'node-fetch';

export const Test = async (req, res) => {

    const start = req.query.start;
    const end = req.query.end;

    fetch(`http://panelharga.badanpangan.go.id/data/provinsi-range-by-levelharga/13/3/${start}/${end}`)
    .then(res => Promise.all([res.json()]))
    .then(([jsonData]) => {
        console.log(JSON.stringify(jsonData, null, 2));
        res.json(jsonData);
    });

   

}
    

