const {ValidateToken} = require('../services/MidiaNinjaService');
const ErrorResponse = require("../utils/ErrorResponse");
const {GetRoleByIda} = require('../services/CharacterService');

const roleOrder = {
	all: 0,
	user: 1,
	same_user: 2,
	staff: 3,
	admin: 4
}

const AuthorizeToken = (permission) => async (req, res, next) => {

	var resToken;

	if(req.headers.authorization && req.headers.authorization.length > 0){
		resToken = await ValidateToken(req.headers.authorization.slice(7));
	}
	else{
		next(new ErrorResponse(`Empty JWT token`, 400));
	}

	if(resToken){

		if(resToken.status == 401){
			next(new ErrorResponse(`Unauthorized JWT token`, 401));
		}
		else if(resToken.status != 200){
			next(new ErrorResponse(`Error in authorization server`, 500));
		}
		
		var resRole = await GetRoleByIda(resToken);

		if(resRole == null){
			resToken.role = 'all';
		}
		else{
			resToken.role = resRole.role;

			//Getting role
			let characterId = req.params.characterId;
			if(!characterId){
				characterId = req.body.characterId;
			}

			if(roleOrder[resToken.role] == roleOrder["user"] && resRole._id == characterId){
				resToken.role = 'same_user';
			}
		}

		//Role checking
		if(roleOrder[permission] > roleOrder[resToken.role]){
			next(new ErrorResponse(`This user's role doesn't have permission to make this request.`, 403));
		}

		console.log(resToken);

		res.resToken = resToken;
	}

    next();
}

module.exports = AuthorizeToken;