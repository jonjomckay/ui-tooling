export default class Whos {
    static fullName(who) {
        if (who) {
            return who.firstName + ' ' + who.lastName;
        }

        return 'Unknown';
    }
}
