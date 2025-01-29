import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738157533976 implements MigrationInterface {
    name = 'Migration1738157533976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Device" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "os" character varying NOT NULL, "ip" character varying, "browser" character varying, "location" character varying, "isTrusted" boolean NOT NULL DEFAULT false, "lastActiveAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_f0a3247774bd4eaad2177055336" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AuthProvider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "providerId" character varying NOT NULL, "accessToken" character varying, "refreshToken" character varying, "expiresAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_e87a5e55862e8eb38d6d1113a6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Device" ADD CONSTRAINT "FK_dc1618bce8f5b8a05b1de99bf25" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AuthProvider" ADD CONSTRAINT "FK_32f93ef25e15640beb7f0bae904" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AuthProvider" DROP CONSTRAINT "FK_32f93ef25e15640beb7f0bae904"`);
        await queryRunner.query(`ALTER TABLE "Device" DROP CONSTRAINT "FK_dc1618bce8f5b8a05b1de99bf25"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "AuthProvider"`);
        await queryRunner.query(`DROP TABLE "Device"`);
    }

}
