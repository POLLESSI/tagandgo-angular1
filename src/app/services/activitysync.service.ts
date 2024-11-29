import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivityModel } from '../models/activity/activity.model';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActivitySyncService {
    constructor(private toastr: ToastrService) {}
    private notificationSubject = new Subject<string>;
    private activityListSource = new BehaviorSubject<ActivityModel[]>([]);
    public activityList$ = this.activityListSource.asObservable();

    notifications$ = this.notificationSubject.asObservable();
    
    get activities$(): Observable<ActivityModel[]> {
        return this.activityListSource.asObservable();
    }
    // Méthodes pour mettre à jour laliste des activités
    setActivityList(activities: ActivityModel[], message: string): void {
        console.log('Activity List updated', activities);
        this.activityListSource.next(activities);
        this.toastr.info('The list of activities has been updated.', 'Update');
        this.notificationSubject.next(message);
    }

    addOrUpdateActivity(activity: ActivityModel): void {
        const currentList = this.activityListSource.getValue();
        const index = currentList.findIndex(a => a.activity_Id === activity.activity_Id);

        if (index !== -1) {
            currentList[index] = { ...currentList[index], ...activity };
        } else {
            currentList.push(activity);
        }
        this.activityListSource.next(currentList);
    }

    updateActivity(activity: ActivityModel): void {
        const currentActivities = this.activityListSource.value;
        const updatedActivities = currentActivities.map(a => 
            a.activity_Id === activity.activity_Id ? activity : a
        );
        this.activityListSource.next(updatedActivities);
        this.toastr.success(`The activity "${activity.activityName}" has been updated.`, 'Success')
    }
}