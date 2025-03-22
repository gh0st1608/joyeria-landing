
import { Contact } from '../../../contact/domain/entities/contact.entity';

export interface INotificationRepository {
    sendEmail(contact: Contact): Promise<void>;
    sendSMS(): Promise<void>;
}