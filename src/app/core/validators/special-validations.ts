export class SpecialValidations {

  static currentOrLaterDate(controlName: string, dateUpdate?: Date): any {
    return (control: any) => {

      if (!control?.value) return;

      let dateCurrentUpdate = new Date();
      if (dateUpdate !== undefined) {
        dateCurrentUpdate = new Date(dateUpdate);
        dateCurrentUpdate.setDate(dateCurrentUpdate.getDate() + 1);
      }
      const dateRelease = new Date(control.value);
      const dateNow = new Date();
      dateRelease.setDate(dateRelease.getDate() + 1);
      dateNow.setHours(17, 0, 0, 0);
      if (dateRelease.getTime() >= dateCurrentUpdate.getTime()) return null;
      if (dateNow.getTime() <= dateRelease.getTime()) return null;
      return { [`${controlName}_Invalida`]: true };
    };
  }

  static url(controlName: string): any {
    return (control: any) => {
      if (!control?.value) return;
      const urlRegex = /^https:\/\/[^ "]+$/;
      const isURL = urlRegex.test(control?.value);
      if (isURL) return null;
      return { [`${controlName}_Invalida`]: true };
    };
  }
}
