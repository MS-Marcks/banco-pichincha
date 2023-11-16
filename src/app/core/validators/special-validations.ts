export class SpecialValidations {

  static currentOrLaterDate(controlName: string): any {
    return (control: any) => {
      if (!control?.value) return;
      const dateRelease = new Date(control.value);
      const dateNow = new Date();
      dateRelease.setDate(dateRelease.getDate() + 1);
      dateNow.setHours(17, 0, 0, 0);
      if (dateNow <= dateRelease) return null;
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
