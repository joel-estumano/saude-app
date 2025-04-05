export interface IJwtDecode {
	aud: string; // Destinatários a que se destina o JWT
	jti: string; // Identificador único do token
	iat: number; // A hora em que o JWT foi emitido (timestamp Unix)
	nbf: number; // O momento antes do qual o JWT não deve ser aceito (timestamp Unix)
	exp: number; // Data de expiração após o qual o JWT não deve ser aceito.
	sub: string; // Assunto ou dono do token
	scopes: string[]; // Escopos ou permissões do token
}
