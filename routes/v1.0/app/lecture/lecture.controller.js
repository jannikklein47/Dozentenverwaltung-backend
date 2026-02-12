const { Dozent, Vorlesung, Abschluss_Typ, Vorlesung_Status} = require('../../../../models');

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





// // check-role.js
// module.exports = (allowedRoles) => {          // <--- 1. Die Äußere Hülle (Fabrik)
//     return (req, res, next) => {              // <--- 2. Der Innere Arbeiter (Middleware)
//         const userRole = req.userData.role;   // <--- 3. Zugriff auf Daten von checkAuth
        
//         if (allowedRoles.includes(userRole)) {
//             next();                           // <--- 4. Tür auf!
//         } else {
//             res.status(403).json({ message: "Verboten" }); // <--- 5. Tür zu!
//         }
//     }
// }

// // config/roles.js
// const ROLES = {
//     ADMIN: 'admin',
//     USER: 'user',
//     LECTURER: 'lecturer'
// };
// module.exports = ROLES;