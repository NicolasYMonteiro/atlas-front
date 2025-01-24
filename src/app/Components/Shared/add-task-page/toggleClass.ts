// toggleClass.ts

export class ToggleClass {
    // Flags
    isDivGapVisible = false;
    isSectionWeekDayVisible = false;
    isSectionDateVisible = true;
    isSectionPersonDayVisible = false;
  
    isVerifEmergency = false;
    isVerificadoPeriod = false;
    isVerificadoDaily = false;
    isVerificadoWeek = false;
    isVerificadoCustom = false;
    isVerifSub = false;
  
    constructor(private data: any) {}
  
    toggleEmergency() {
      this.isVerifEmergency = !this.isVerifEmergency;
      this.data.emergency = this.isVerifEmergency;
    }
  
    toggleDivGapVisibility() {
      this.isDivGapVisible = !this.isDivGapVisible;
      this.isVerificadoPeriod = !this.isVerificadoPeriod;
      this.isSectionDateVisible = !this.isSectionDateVisible;
  
      this.resetPeriodOptions();
      this.data.periodical = !this.data.periodical;
      this.data.interval = 0;
    }
  
    toggleSectionDailyDayVisibility() {
      this.isVerificadoDaily = !this.isVerificadoDaily;

      this.isVerificadoWeek = false;
      this.isVerificadoCustom = false;
      this.isSectionWeekDayVisible = false;
      this.isSectionPersonDayVisible = false;

      this.data.interval = 1;
    }
  
    toggleSectionWeekDayVisibility() {
      this.isVerificadoWeek = !this.isVerificadoWeek;
      this.isSectionWeekDayVisible = !this.isSectionWeekDayVisible;

      this.isVerificadoCustom = false;
      this.isSectionPersonDayVisible = false;
      this.isVerificadoDaily = false;

      this.data.interval = 7;
    }
  
    toggleSectionPersonDayVisibility() {
      this.isVerificadoCustom = !this.isVerificadoCustom;
      this.isSectionPersonDayVisible = !this.isSectionPersonDayVisible;

      this.isVerificadoDaily = false;
      this.isVerificadoWeek = false;
      this.isSectionWeekDayVisible = false;
    }
  
    toggleSectionSubVisibility() {
      this.isVerifSub = !this.isVerifSub;
      this.data.multiple = this.isVerifSub;
    }
  
    resetPeriodOptions() {
      this.isVerificadoDaily = false;
      this.isVerificadoWeek = false;
      this.isVerificadoCustom = false;
    }
  }