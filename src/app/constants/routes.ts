export class RoutesDefined {
    public static readonly LOGIN = "login";
    public static readonly FOBIDDEN = "forbidden";
    public static readonly DASHBOARD = "dashboard";
    public static readonly ACTIVITY = "activity";
    public static readonly AVATAR = "avatar";
    public static readonly BONUS = "bonus";
    public static readonly MAP = "map";
    public static readonly MEDIAITEM = "mediaitem";
    public static readonly NEVENEMENT = "nevenement";
    public static readonly NICON = "nicon";
    public static readonly NPERSON = "nperson";
    public static readonly NUSER = "nuser";
    public static readonly NVOTE = "nvote";
    public static readonly ORGANISATEUR = "organisateur";
    public static readonly RECOMPENSE = "recompense";
    public static readonly WEATHERFORECAST = "weatherforecast";
    public static readonly WELCOME = "welcome";
    public static readonly PROFILE = "profile";
static REGISTER: any|string;

    public static getRoutes(): { path: string, name: string }[] {
        return [
            { path: RoutesDefined.LOGIN, name: 'Login' },
            { path: RoutesDefined.FORBIDDEN, name: 'Forbidden' },
            { path: RoutesDefined.DASHBOARD, name: 'Dashboard' },
            { path: RoutesDefined.ACTIVITY, name: 'Activity' },
            { path: RoutesDefined.AVATAR, name: 'Avatar' },
            { path: RoutesDefined.BONUS, name: 'Bonus' },
            { path: RoutesDefined.MAP, name: 'Map' },
            { path: RoutesDefined.MEDIAITEM, name: 'Media Item' },
            { path: RoutesDefined.NEVENEMENT, name: 'NEvenement' },
            { path: RoutesDefined.NICON, name: 'NIcon' },
            { path: RoutesDefined.NPERSON, name: 'NPerson' },
            { path: RoutesDefined.NUSER, name: 'NUser' },
            { path: RoutesDefined.NVOTE, name: 'NVote' },
            { path: RoutesDefined.ORGANISATEUR, name: 'Organisateur' },
            { path: RoutesDefined.RECOMPENSE, name: 'Recompense' },
            { path: RoutesDefined.WEATHERFORECAST, name: 'Weather Forecast' },
            { path: RoutesDefined.WELCOME, name: 'Welcome' },
            { path: RoutesDefined.PROFILE, name: 'Profile' }
        ];
    }
    static FORBIDDEN: string;
};