import fetch from 'node-fetch';

// export const EceranList = async (req, res) => {
//     process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
//     const start = req.query.start;
//     const end = req.query.end;


//     let pailud = `${start}/${end}`;

//     fetch(`http://panelharga.badanpangan.go.id/data/provinsi-range-by-levelharga/13/3/${pailud}`)
//     .then(res => Promise.all([res.json()]))
//     .then(([jsonData]) => {
//         console.log(JSON.stringify(jsonData, null, 2));
//         res.json(jsonData);
//     });


// }

export const EceranList = async (req, res) => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const start = req.query.start; // format: DD-MM-YYYY
    const end = req.query.end;    // format: DD-MM-YYYY

    // Convert date format from DD-MM-YYYY to DD/MM/YYYY
    const formatDateForAPI = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const startFormatted = formatDateForAPI(start);
    const endFormatted = formatDateForAPI(end);
    
    const periodDate = encodeURIComponent(`${startFormatted} - ${endFormatted}`);
    
    const apiUrl = `https://api-panelhargav2.badanpangan.go.id/api/front/table-rekapitulasi?period_date=${periodDate}&level_harga_id=3&province_id=13&city_id=`;

    fetch(apiUrl)
        .then(res => Promise.all([res.json()]))
        .then(([jsonData]) => {
            console.log(JSON.stringify(jsonData, null, 2));
            res.json(jsonData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
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
  
    

