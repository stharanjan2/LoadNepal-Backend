import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1646031048585 implements MigrationInterface {
    name = 'InitialTables1646031048585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("_id" SERIAL NOT NULL, "lisenceNo" character varying NOT NULL, "vehicleNo" character varying NOT NULL, "insurance" character varying NOT NULL, "vehicleModel" character varying NOT NULL, "year" character varying NOT NULL, "make" character varying NOT NULL, "axelNo" character varying NOT NULL, "tyreNo" character varying NOT NULL, "bodyType" character varying NOT NULL, "totalGrossVehicleWeight" character varying NOT NULL, "lisence" character varying NOT NULL DEFAULT '', "isOnTrip" boolean NOT NULL DEFAULT false, "billbook" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, CONSTRAINT "UQ_f2c2eb4d0be3f672fb2f2c182cd" UNIQUE ("vehicleNo"), CONSTRAINT "PK_70169e14221a60ad20b70a84d58" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("_id" SERIAL NOT NULL, "loadFrom" character varying NOT NULL, "unloadTo" character varying NOT NULL, "dateOfDelivery" character varying NOT NULL, "typeOfGood" character varying NOT NULL, "weightOfGood" integer NOT NULL, "noOfTruck" integer NOT NULL, "price" integer, "truckPreference" character varying NOT NULL, "distance" integer, "customer_username" character varying NOT NULL, "customer_phoneNumber" integer NOT NULL, "isLocked" boolean NOT NULL DEFAULT false, "isAccepted" boolean NOT NULL DEFAULT false, "isConfirmed" boolean NOT NULL DEFAULT false, "isShipped" boolean NOT NULL DEFAULT false, "isDestinationReached" boolean NOT NULL DEFAULT false, "isPayementMade" boolean NOT NULL DEFAULT false, "additionalDescription" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "driver_username" character varying, "driver_phoneNumber" character varying, "user_id" integer, "vehicle_id" integer, "driver_id" integer, CONSTRAINT "REL_95068f72da7a7ca2bc34398eb7" UNIQUE ("vehicle_id"), CONSTRAINT "PK_252c2a9858ce5be707f5c84e78a" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("_id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" integer NOT NULL, "contact_person" character varying NOT NULL DEFAULT '', "city" character varying NOT NULL DEFAULT '', "pan" character varying NOT NULL DEFAULT '', "district" character varying NOT NULL DEFAULT '', "state" character varying NOT NULL DEFAULT '', "identification" character varying NOT NULL DEFAULT '', "verified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roles" "public"."users_roles_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_46c438e5a956fb9c3e86e73e321" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("_id" SERIAL NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "type" character varying NOT NULL, "isViewed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sender_id" integer, "receiver_id" integer, CONSTRAINT "PK_da29ce67c0b8284ca076602f980" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_9c2e0a8772c9e43b32f57bfcfcc" FOREIGN KEY ("driver_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_95068f72da7a7ca2bc34398eb70" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee" FOREIGN KEY ("driver_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_56023c91b76b36125acd4dcd9c5" FOREIGN KEY ("sender_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_90543bacf107cdd564e9b62cd20" FOREIGN KEY ("receiver_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_90543bacf107cdd564e9b62cd20"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_56023c91b76b36125acd4dcd9c5"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_222cd7bf166a2d7a6aad9cdebee"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_95068f72da7a7ca2bc34398eb70"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_9c2e0a8772c9e43b32f57bfcfcc"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
