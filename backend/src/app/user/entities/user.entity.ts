import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'varchar', nullable: false })
    fName: string;

    @Column({ name: 'last_name', type: 'varchar', nullable: false })
    lName: string;

    @Column({ name: 'email', type: 'varchar', nullable: false })
    email: string;

    @Column({ name: 'password', type: 'varchar', nullable: false })
    password: string;

    @Column({ name: 'birth_data', type: 'date', nullable: false })
    birthDate: Date;

    @Column({ name: 'phone', type: 'int', nullable: false })
    phone: number;

    @Column({ name: 'CEP', type: 'int', nullable: true })
    cep: number | null;

    @Column({ name: 'house_number', type: 'int', nullable: true })
    houseNumber: number | null;

    @Column({ name: 'address_complement', type: 'varchar', nullable: true })
    addressComplement: string | null;

    @Column({ name: 'notification', type: 'boolean', default: false})
    notification: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'last_login', type: 'timestamp', nullable: true})
    lastLogin: Date | null;

    @Column({ name: 'photo', type: 'varchar', nullable: true})
    photo: string | null;
}
