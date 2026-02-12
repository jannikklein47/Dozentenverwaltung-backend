const { Dozent, Vorlesung, Abschluss_Typ, Vorlesung_Status} = require('../../../../models');
const Joi = require('joi');

exports.getAllLectures = async (req, res) => {
    try {
        
        const schema = Joi.object({
            limit: Joi.number().integer().min(1).max(5000).default(5000),
            offset: Joi.number().integer().min(0).default(0),
        });

        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        
        const { limit, offset } = value

        const {count, rows} = await Vorlesung.findAndCountAll({
            limit: limit,
            offset: offset,
            
            attributes: ["id", "name", "semester"], 
            distinct: true,
            include: [{
                model: Dozent,
                as: "professors", 
                attributes: ["vorname", "name"],
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
    }};