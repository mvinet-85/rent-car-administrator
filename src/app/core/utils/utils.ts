export class Utils {
  static togglePasswordVisibility(type: string): { type: string, icon: string } {
    if (type === 'password') {
      return {type: 'text', icon: 'eye-off-outline'};
    } else {
      return {type: 'password', icon: 'eye-outline'};
    }
  }
}
