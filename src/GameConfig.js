export default {
    GameWindowSettings: {
        width: 800,
        height: 600,
        zoom: 2.5
    },
    World: {
        width: 320,
        height: 800,
        surface: 76,
        firstLevelY: 163,
        secondLevelY: 218
    },
    DepthLayers: {
        Surface: 1,
        Furniture: 4,
        Player: 5,
        PickedFurniture: 6,
        Lights: 10,
        UpOnLights: 11,
        Night: 12,
        Text: 50
    },
    Temperature: {
        LowestDay: -15,
        LowestNight: -40,
        LimitMax: 27,
        TempatureStepDay: 0.05,
        TempatureStepNight: 0.15,
        LowestPointForTakeHealth: 12
    },
    DayNight: {
        NightStart: 19,
        NightEnd: 6,
        SunriseStartTime: 5,
        SunsetStartTime: 18
    },
    Characters: {
        MaxHealth: 150
    },
    MinimalInteractiveDistance: 10
};
