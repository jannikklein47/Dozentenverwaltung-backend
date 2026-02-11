const { Dozent, Vorlesung, Abschluss_Typ, Vorlesung_Status} = require('../../../models');

exports.getAllLectures = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit) || 2000;
        const offset = parseInt(req.query.offset) || 0;
        
        if (limit > 5000) {limit = 5000;}

        const {count, rows} = await Vorlesung.findAndCountAll({
            limit: limit,
            offset: offset,
            
            attributes: ["id", "name", "semester"], 
            distinct: true,
            include: [{
                model: Dozent,
                as: "professors", 
                attributes: ["id", "name"],
                through: {attributes: []}
            },
            {
                model: Abschluss_Typ,
                as: "completionType",
                attributes: ["name"]
            },
            {
                model: Vorlesung_Status,
                as: "lectureStatus",
                attributes: ["name"]
            }
            ],
            order: [["id", "ASC"]],
        });

        res.status(200).json({
            total: count,
            lectures: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }}
