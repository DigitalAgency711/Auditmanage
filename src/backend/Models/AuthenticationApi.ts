export interface LoginRequest {
	email: string;
	password: string;
}

export interface MfaRequest {
	email : string;
	password : string ;
	mfa_token : string ;
}

export interface ForgetRequest {
	username : string;
}

export interface ResetRequest{
	email : string,
	old_password : string,
	password : string,
	user_data : {
		name : string,
		company : string
	}
}

export interface UserToken {
	token: string;
}
