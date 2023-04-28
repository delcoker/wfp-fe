import AlertDataRepository from "../../domain/repositories/AlertDataRepository";
import axios from "axios";

export default class AlertDataRepositoryImpl implements AlertDataRepository {

    async getAlertData() {
        try {
            const response = await axios.get('https://6ro4cvq3sc.execute-api.eu-central-1.amazonaws.com/default/get_daily_alert', { params: {} });
            return response.data;
        } catch (error) {
            throw new Error(`Error retrieving alert data: ${error}`);
        }
    }
}