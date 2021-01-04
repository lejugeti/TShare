CREATE DATABASE tshare;

CREATE TABLE Utilisateur
(
	idUtilisateur INT NOT NULL AUTO_INCREMENT,
	genre VARCHAR(100),
	nom VARCHAR(100) NOT NULL,
 	prenom VARCHAR(100) NOT NULL,
	age INT,
	adresse VARCHAR(100),
	email VARCHAR(100) NOT NULL,
	telephone INT,
	PRIMARY KEY (idUtilisateur)
);

CREATE TABLE Notes
(
	idNote INT NOT NULL AUTO_INCREMENT,
	idEmetteur INT NOT NULL,
	idRecepteur INT NOT NULL,
	note INT NOT NULL,
	commentaire VARCHAR(500),
	dateNote DATETIME NOT NULL DEFAULT CURDATE(),
	PRIMARY KEY (idNote),
	FOREIGN KEY (idEmetteur) REFERENCES Utilisateur(idUtilisateur),
	FOREIGN KEY (idRecepteur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Type
(
	idType INT NOT NULL AUTO_INCREMENT,
	label VARCHAR(100) NOT NULL,
	idTypeParent INT,
	PRIMARY KEY (idType)
);

CREATE TABLE Vetement
(
	idVetement INT NOT NULL AUTO_INCREMENT,
	idProprietaire INT NOT NULL,
	idType INT NOT NULL,
	titre VARCHAR(100) NOT NULL,
	dateDebutDispo DATETIME NOT NULL DEFAULT CURDATE(),
	dateFinDispo DATETIME,
	taille VARCHAR(100) NOT NULL,
	etat VARCHAR(100) NOT NULL,
	genre VARCHAR(100) NOT NULL,
	description VARCHAR(500),
	prix DOUBLE NOT NULL,
	conditionRetour VARCHAR(100),
	caution INT NOT NULL DEFAULT 0,
	disponible BOOLEAN NOT NULL DEFAULT true,
	photo VARCHAR(100),
	marque VARCHAR(100),
	categorie VARCHAR(100) NOT NULL,
	localisation VARCHAR(100) NOT NULL,
	couleur VARCHAR(100) NOT NULL,
	PRIMARY KEY (idVetement),
	FOREIGN KEY (idProprietaire) REFERENCES Utilisateur(idUtilisateur),
	FOREIGN KEY (idType) REFERENCES Type(idType)
);

CREATE TABLE Location
(
	idLocation INT NOT NULL AUTO_INCREMENT,
	idProprietaire INT NOT NULL,
	idLocataire INT NOT NULL,
	idVetement INT NOT NULL,
	dateDemande DATETIME,
	dateAcceptation DATETIME,
	dateDebut DATETIME NOT NULL DEFAULT CURDATE(),
	dateFinPrevue DATETIME NOT NULL,
	dateRendu DATETIME,
	etatDebut VARCHAR(100) NOT NULL,
	etatFin VARCHAR(100),
	PRIMARY KEY (idLocation),
	FOREIGN KEY (idProprietaire) REFERENCES Utilisateur(idUtilisateur),
	FOREIGN KEY (idLocataire) REFERENCES Utilisateur(idUtilisateur),
	FOREIGN KEY (idVetement) REFERENCES Vetement(idVetement)
);
