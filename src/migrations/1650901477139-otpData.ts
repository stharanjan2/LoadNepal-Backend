import {MigrationInterface, QueryRunner} from "typeorm";

export class otpData1650901477139 implements MigrationInterface {
    name = 'otpData1650901477139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_95068f72da7a7ca2bc34398eb70"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee"`);
        await queryRunner.query(`CREATE TABLE "otp" ("_id" SERIAL NOT NULL, "otp" integer NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_05b19d9bee3daf273c978d6896e" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "loadFrom"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "unloadTo"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "dateOfDelivery"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "typeOfGood"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "weightOfGood"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "noOfTruck"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "truckPreference"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "distance"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer_username"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer_phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "isLocked"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "isPayementMade"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "additionalDescription"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "REL_95068f72da7a7ca2bc34398eb7"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "vehicle_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "driver_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "vehicleNo" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payementMade" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "advance" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "total" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "due" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "amount_payed" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_id" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "loadFrom" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "unloadTo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "dateOfDelivery" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "typeOfGood" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "weightOfGood" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "noOfTruck" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "price" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "truckPreference" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "distance" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customer_username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customer_phoneNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "isLocked" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "isPayementMade" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "additionalDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "vehicle_id" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_95068f72da7a7ca2bc34398eb70" UNIQUE ("vehicle_id")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "driver_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verified" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cad55b3cb25b38be94d2ce831db" FOREIGN KEY ("order_id") REFERENCES "orders"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_95068f72da7a7ca2bc34398eb70" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee" FOREIGN KEY ("driver_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_95068f72da7a7ca2bc34398eb70"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cad55b3cb25b38be94d2ce831db"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verified" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "driver_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_95068f72da7a7ca2bc34398eb70"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "vehicle_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "additionalDescription"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "isPayementMade"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "isLocked"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer_phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer_username"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "distance"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "truckPreference"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "noOfTruck"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "weightOfGood"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "typeOfGood"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "dateOfDelivery"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "unloadTo"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "loadFrom"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount_payed"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "due"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "advance"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payementMade"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "vehicleNo"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying NOT NULL DEFAULT 'male'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "driver_id" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "vehicle_id" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "REL_95068f72da7a7ca2bc34398eb7" UNIQUE ("vehicle_id")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "additionalDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "isPayementMade" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "isLocked" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customer_phoneNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customer_username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "distance" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "truckPreference" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "price" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "noOfTruck" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "weightOfGood" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "typeOfGood" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "dateOfDelivery" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "unloadTo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "loadFrom" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee" FOREIGN KEY ("driver_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_95068f72da7a7ca2bc34398eb70" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
