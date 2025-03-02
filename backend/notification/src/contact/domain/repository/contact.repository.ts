
import { Contact } from '../entities/contact.entity';

export interface IContactRepository {
    create(product: Contact): Promise<Contact>;
}