export default class InternalAPI {
  constructor() {
    this.url = 'TODO';
    this.publicKey = 'TODO';
  }

  getMealPlanDetailData = async () => {
    try {
      return fetch(this.url + '/rest/v1/MealPlanDetailData?select=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.publicKey,
          Authorization: `Bearer ${this.publicKey}`
        },
        redirect: 'follow',
      }).then(response => {
        if (!response.ok) {
          console.log('response was not a 200-299 status code');
        }
        return response.json();
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  getCurrentSemesterData = async () => {
    try {
      return fetch(this.url + '/rest/v1/SemesterDetails?select=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.publicKey,
          Authorization: `Bearer ${this.publicKey}`
        },
        redirect: 'follow',
      }).then(response => {
        if (!response.ok) {
          console.log('response was not a 200-299 status code');
        }
        return response.json();
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
