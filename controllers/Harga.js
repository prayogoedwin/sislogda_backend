import fetch from 'node-fetch';

export const EceranList = async (req, res) => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const start = req.query.start;
    const end = req.query.end;


    let pailud = `${start}/${end}`;

    fetch(`http://panelharga.badanpangan.go.id/data/provinsi-range-by-levelharga/13/3/${pailud}`)
    .then(res => Promise.all([res.json()]))
    .then(([jsonData]) => {
        console.log(JSON.stringify(jsonData, null, 2));
        res.json(jsonData);
    });


}

export const EceranListExternal = async (req, res) => {

    if(req.headers['x-api-key'] != 'a9c92ba6-12de-4921-a6cc-51adb04fb351'){

        res.statusCode = 400;
        res.json({
            'status' : 0,
            'message': 'Token tidak valid',
            'data' : Array()
        });
        // process.exit();

    }else{

        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        const start = req.query.start;
        const end = req.query.end;


        let pailud = `${start}/${end}`;

        fetch(`http://panelharga.badanpangan.go.id/data/provinsi-range-by-levelharga/13/3/${pailud}`)
        .then(res => Promise.all([res.json()]))
        .then(([jsonData]) => {
            console.log(JSON.stringify(jsonData, null, 2));
            res.json(jsonData);
        });

    }

}

export const ProdusenList = async (req, res) => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const start = req.query.start;
    const end = req.query.end;


    let pailud = `${start}/${end}`;

    fetch(`http://panelharga.badanpangan.go.id/data/provinsi-range-by-levelharga/13/1/${pailud}`)
    .then(res => Promise.all([res.json()]))
    .then(([jsonData]) => {
        console.log(JSON.stringify(jsonData, null, 2));
        res.json(jsonData);
    });


}

export const ProdusenListExternal = async (req, res) => {

    if(req.headers['x-api-key'] != 'a9c92ba6-12de-4921-a6cc-51adb04fb351'){

        res.statusCode = 400;
        res.json({
            'status' : 0,
            'message': 'Token tidak valid',
            'data' : Array()
        });
        // process.exit();

    }else{
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        const start = req.query.start;
        const end = req.query.end;


        let pailud = `${start}/${end}`;

        fetch(`http://panelharga.badanpangan.go.id/data/provinsi-range-by-levelharga/13/1/${pailud}`)
        .then(res => Promise.all([res.json()]))
        .then(([jsonData]) => {
            console.log(JSON.stringify(jsonData, null, 2));
            res.json(jsonData);
        });
    }


}

export const GrosirList = async (req, res) => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const start = req.query.start;
    const end = req.query.end;


    let pailud = `${start}/${end}`;

    fetch(`http://panelharga.badanpangan.go.id/data/provinsi-range-by-levelharga/13/2/${pailud}`)
    .then(res => Promise.all([res.json()]))
    .then(([jsonData]) => {
        console.log(JSON.stringify(jsonData, null, 2));
        res.json(jsonData);
    });


}
  
    

