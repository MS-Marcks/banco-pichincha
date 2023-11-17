export class SpecialValidations {

  // function para una validación especial en el formulario de creación o edición de un producto en la parte de la fecha que se posterior o igual
  static currentOrLaterDate(controlName: string, dateUpdate?: Date): any {
    return (control: any) => {

      if (!control?.value) return;
      let dateCurrentUpdate = new Date();
      if (dateUpdate !== undefined) { // sirve para realizar la actualización de la fecha si es posterior pero desea cambiar otro dato
        dateCurrentUpdate = new Date(dateUpdate);
        dateCurrentUpdate.setDate(dateCurrentUpdate.getDate() + 1);
      }
      const dateRelease = new Date(control.value);
      const dateNow = new Date();
      dateRelease.setDate(dateRelease.getDate() + 1);
      dateNow.setHours(17, 0, 0, 0);

      if (dateRelease.getTime() >= dateCurrentUpdate.getTime()) return null; //es una fecha valida
      if (dateNow.getTime() <= dateRelease.getTime()) return null; //es una fecha valida
      return { [`${controlName}_Invalida`]: true }; //es una fecha invalida
    };
  }

  // function para una validación especial en el formulario para que el logo sea una url
  static url(controlName: string): any {
    return (control: any) => {
      if (!control?.value) return;
      const urlRegex = /^https:\/\/[^ "]+$/;
      const isURL = urlRegex.test(control?.value);
      if (isURL) return null; // es una url válida
      return { [`${controlName}_Invalida`]: true };// no es una url válida
    };
  }
}
