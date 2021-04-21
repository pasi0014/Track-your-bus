export class HelperModule {
  public static timeConvert(n: any): string {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    let hasHours = rhours + " hour " + rminutes + " minutes";
    let noHours = rminutes + " minutes";
    if (rhours !== 0) {
      return hasHours;
    }
    if (rminutes === 1) return rminutes + " minute";
    return noHours;
  }
}
