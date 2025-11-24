const { combineRgb } = require('@companion-module/base')

// 图标资源
const ICONS = {
    up: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIFJREFUKM+90EEKgzAQRmFDFy49ghcp5FquVPBighcRegHBjWDJ68D8U6F7m00+EnhkUlW3ru6rdyCV0INQzSg1zFLLKmU2aeCQQMEEJXIQORRsTLNyKJhNm3IoaPBg4mQorp2Mh1+00kKN307o/bZrpt5O/FlPU/c75X91/fPd6wPRD1eHyHEL4wAAAABJRU5ErkJggg==',
    down: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIlJREFUKM/F0DEOwyAMBVAjDxk5Qo7CtdiClIv1KJF6gUpZIhXxY2zTDJ2benoS8LFN9MsKbYjxF2XRS1UZ4bCeGFztFmNqphURpidm146kpwFvLDYJpPQtLSLNoySyP2bRpoqih2oSFW8K3lYAxmJGXA88XMnjeuDmih7XA8vXvNeeqX6U6aY6AacbWAQNWOPUAAAAAElFTkSuQmCC',
    left: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHpJREFUKM+1kTEOgCAQBM9Q2JjwA/mJPA2fxlN4giWF8TRBBhMpbKSaZie3i8gPb4Y8FNZKGm8YIAONkNWacIruQLejy+gyug1dQhfRqZa0v6gYA6QfqSWapZnto1B6XdUuFaVHoJunr2MD21nIdJYUEhLYfoGmP777BKKIXC0eYSD5AAAAAElFTkSuQmCC',
    right: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHhJREFUKM+10LERgCAMQFE4CktHcBRWcRMYzVEcwdKCI+od+fGksVCq3/AuiXOfvZnaNXzRClVrEKtMLdSqP2RTRQAFMAFGwAlw7MAk0sAzGnhVoerLKg/F5Pv4NoFNZZNGpk9sxJYeLsDdL5T7S8IFOM/R3OZ+fQeQZV9pMy+bVgAAAABJRU5ErkJggg==',
    up_right: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABhlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+X02G5AAAAgXRSTlMAAte32QZhZx7d+TywDTf8/d5VstYPOxULNvKmSY8TFBrxyeGCluJeELQ5uw7ULND4BedlKuv2P/vDA8UgCk30WO41s8+5X8dABAz6QhHVaR156JpPnihSfTJDNOMBm4bzSICqr23NsRjcGRbtjTCS2lzsOmyu9+WLKb2fTL8+RPDhqO4yAAABfElEQVRYw+3WZW/CUBQG4AO0FBsOwwcMm7sLc3d3d3e388/HGGs7lpD0tsm+9P3S5CT3SdPec+8BkCNHzv9FAVAAEABYdQDkA7jo9GNUIDMBzstb5vr0/Gx8Z35zOjI36R2xbu+619eWa2xCoK0FClF5h1cWxDHEwilEOyLlQc8hokoAlMRcESBh7siQlJBWKkijNaHuPrWBED9iYiDQ7Pv1D4Z4/DXyFo2JgeAghQEkEgAvT6IgNo/PIUmgd62oj80mqEIpINoXRkmg2j2UBDIWVXKLTSXEUIOF/xbV5aRQsJvvUOoqMqjZZ+c7FcX8ThYCtTbxHV0fkEGDA73D3Dpzi/6rWEYAdSn579PZ/t3IBJChkef0dLRlHXdkJ6TSmSnmiYPq1LQIiGHX9BvZYinJ7/+R6q1czUG0j9KSOTxDc6UhshZhMIQrS78mncwZtzErrNcYL6V2Zd0tJ6i7QFtAYPcvHv25W6J+/Y3BrRA/x6WGuGN5mpUjhyyfsGtrpKE95HoAAAAASUVORK5CYII=',
    down_right: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABXFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9jYfXuAAAAc3RSTlMAQ98Ox1j9gAtRNTqBPfgu9p/MTQ+G1Qfx7Y0VBYyJgjkGd3ysU+Zz1IQvMM20PgwBp8Mi4TSUiDvlPxylsaF2WfcjJh0S+wLzQLmY4l/ovX3ra1rPLAOSKa4RUEvgcZwbFHqPzodGbX7qPMvCtsEq1laguT+HEwAAAVlJREFUWMPt1sduwkAQgOGxDfFCIITe0nvvvZHee++992TeX4pJQIC9hPWaQ6T41x6skfY7WGPJAGZm/6qgZjIH4AMgOp2Lq32batTkdW/trPt9+qC70DVmSKS2BXF7A1fX9DDnN2FUSpe8y5hID3SZuJMmrcwmoSFm5vD0BDWSNTnCUmZoD1PZtJCDGfIgRUpBMjPkR4rEAwUtFIkHAkKRuCCaxAdRJE5IK/FCGumWF1JLEW5ILfFD2ST9UBaJA6JLPBCQ57xAJcp5NQbtSgBReJSsH8QI5No8ODo+u397ecL3T35IGhcRA4jig8E9qmjAX2OGnAV5ggrxr0ELOaByVmg6B1TGvEYyTvxcKUaMv/gi7xN/VAZYY2dfSHkkPOYY7Kpf7OmLzLfGPIFGd6izWrRUjdYt9Xfo+ULsLpgRKqGtGyadAEIUmnuhXSAwMAXD5j+omZlZRl+X30CWTm2dHwAAAABJRU5ErkJggg==',
    up_left: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABLFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PVkEkAAAAY3RSTlMAAQ/6Uc0OEAvHTzL7TcudsMHvdwnfUwMcG8UGiIfTrIkg9QI+/ZTDe460km73LNovCo1vQUuR4Lwk45/OK+3UERTkekziZlSK8QQnoOsFaaXmLqOylvPZLYDRZTUWUpiTDfAuEmiSAAABUklEQVRYw+3WZ2+DMBAG4EtTygrQ7NHsJt1777333vv+/38o6gIMSo0dqf3AK1lIZ/mRjPEJgCBBgvxtQr8WqDKbCiWUG1AnYXU7C7UJqKQSR5oKQwqIPphsYW24nEPjJCYXilf9F+G+qeTmThTP5w8X8gK9NLqOGMGPhD8fdXtBkGihlmlsmF5aqK2xg9FmQe3/DupuEhTpoT41z/V1HVHfxWRRo/6ORBfyjILx9mRo+2MDlS3ggF5q4uP9qzmVNjfOA+EDdDLcWA8IW6FJEJPkCbFI3hCDZEFVPsmC7mQuyYJ0iUuyIAG4JDvEJTkgHskJcUgExC6RECmxQ4REDa24ILsU6wL/rfYHskmX9C87Pfi9aA5cUmnRx/kffDmncSCkat7X342KSzOIuesNR1WSl7GU8Xfbbs9Gyoo0TvRp6Tie8d2TOsyx51UMEiQIS94B13oTqqYgGGoAAAAASUVORK5CYII=',
    down_left: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABg1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aT76cAAAAgHRSTlMAafwJfflezc+3WA7Z5Rk6PAvpBNE73kJT89QxZ48czNIv9A1DnI3qKQUaymjT4a7HdVuGf85LR20CVHr+tLBlA0GvYSTYZEnbAcazNPX4yB4GrAgnmL6Bcj4qIVKIe8kdVadIEe27B90bOG/3Er1rYJq1wibyh+4Q5CMzRllMXDo5euMAAAGfSURBVFjD7dblUwJBGAbw5aSlBJRGQERBkLC7u7u7u7veP90jDnaEcdhjP+k9X5h9Zu43O7PLe4eQECH/KGsIaUooOEcLK75LpehH628idSrE+nMANfyQ3MY2BRm0C6mM462tUwJAJtVyUB1WmsoSFZEk46D6TBcYS3UKPpCYawxD5VxHImVD/RHIxMQbGintkGQcppkcOkuutQPYfkDfmjck556ZTSydve2YY5UWk0Mww672VPh+XFqCU8tA+whtL+KOpa+bF3Rh8B4ymDNaSnSzG9IPIpsL34/HTPZfS58auMPYuYNMWcQXOsD3U9ZDOkZkkCvqwSIqUI2WfEDmgiQxRANiIp8GKtDLO6/Znw19oOdXhKoROtEUBr1F5Y9f4dt1XygqKgh6YqcHwMQkQBWICr1H6czTgrpoQde0IGnekJEWNEwLMv/GPDDB/M/fDioVeLYA5GqoYt+xNRY4toJkCiBUG7vTEVxJu2Z549RbqXQuba7uVDZWO66mgw6d7kYaEPvvCb+REIp/srGzLP4aa0n8zKFkKUSIkD+Qb9QrYMvxAbaBAAAAAElFTkSuQmCC'
};

// 简化的预设生成函数
function createSimplePreset(self, key, category, name, style, steps, feedbacks = []) {
    return {
        type: 'button',
        category,
        name,
        style,
        steps,
        feedbacks
    };
}

function createActionPreset(self, key, category, name, actionId, options = {}, style = {}) {
    const defaultStyle = {
        text: name,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        ...style
    };

    return createSimplePreset(
        self,
        key,
        category,
        name,
        defaultStyle,
        [
            {
                down: [
                    {
                        actionId,
                        options
                    }
                ],
                up: []
            }
        ]
    );
}

function createPTZPreset(self, key, category, name, panTilt, panSpeed = 10, tiltSpeed = 10, style = {}) {
    const defaultStyle = {
        text: '',
        size: 'auto',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        ...style
    };

    return createSimplePreset(
        self,
        key,
        category,
        name,
        defaultStyle,
        [
            {
                down: [
                    {
                        actionId: 'pan_tilt_action',
                        options: {
                            pan_tilt: panTilt,
                            pan_speed: panSpeed,
                            tilt_speed: tiltSpeed
                        }
                    }
                ],
                up: [
                    {
                        actionId: 'pan_tilt_action',
                        options: {
                            pan_tilt: '0303',
                            pan_speed: 1,
                            tilt_speed: 1
                        }
                    }
                ]
            }
        ]
    );
}

function createFocusPreset(self, key, category, name, focusAction, speed = null, style = {}) {
    const defaultStyle = {
        text: name,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
        ...style
    };

    let options = { focus: focusAction };
    if (speed) {
        options.focus = focusAction;
        options[speed > 0 ? 'far' : 'near'] = Math.abs(speed);
    }

    const steps = [
        {
            down: [
                {
                    actionId: 'focus_action',
                    options
                }
            ],
            up: focusAction.includes('08') ? [
                {
                    actionId: 'focus_action',
                    options: { focus: '0800' }
                }
            ] : []
        }
    ];

    return createSimplePreset(self, key, category, name, defaultStyle, steps);
}

module.exports = function (self) {
    const presets = {};

    /*********************
     云台控制预设
    *********************/
    presets.ptz_up = createPTZPreset(
        self,
        'ptz_up',
        'Pan/Tilt',
        'Up',
        '0301',
        10,
        10,
        { png64: ICONS.up, pngalignment: 'center:center' }
    );

    presets.ptz_down = createPTZPreset(
        self,
        'ptz_down',
        'Pan/Tilt',
        'Down',
        '0302',
        10,
        10,
        { png64: ICONS.down, pngalignment: 'center:center' }
    );

    presets.ptz_left = createPTZPreset(
        self,
        'ptz_left',
        'Pan/Tilt',
        'Left',
        '0103',
        10,
        10,
        { png64: ICONS.left, pngalignment: 'center:center' }
    );

    presets.ptz_right = createPTZPreset(
        self,
        'ptz_right',
        'Pan/Tilt',
        'Right',
        '0203',
        10,
        10,
        { png64: ICONS.right, pngalignment: 'center:center' }
    );

    presets.ptz_up_left = createPTZPreset(
        self,
        'ptz_up_left',
        'Pan/Tilt',
        'Up Left',
        '0101',
        10,
        10,
        { png64: ICONS.up_left, pngalignment: 'center:center' }
    );

    presets.ptz_up_right = createPTZPreset(
        self,
        'ptz_up_right',
        'Pan/Tilt',
        'Up Right',
        '0201',
        10,
        10,
        { png64: ICONS.up_right, pngalignment: 'center:center' }
    );

    presets.ptz_down_left = createPTZPreset(
        self,
        'ptz_down_left',
        'Pan/Tilt',
        'Down Left',
        '0102',
        10,
        10,
        { png64: ICONS.down_left, pngalignment: 'center:center' }
    );

    presets.ptz_down_right = createPTZPreset(
        self,
        'ptz_down_right',
        'Pan/Tilt',
        'Down Right',
        '0202',
        10,
        10,
        { png64: ICONS.down_right, pngalignment: 'center:center' }
    );

    presets.ptz_home = createActionPreset(
        self,
        'ptz_home',
        'Pan/Tilt',
        'Home',
        'pan_tilt_action',
        { pan_tilt: '04' }
    );

    presets.ptz_reset = createActionPreset(
        self,
        'ptz_reset',
        'Pan/Tilt',
        'Reset',
        'pan_tilt_action',
        { pan_tilt: '05' }
    );

    /*********************
     镜头控制预设
    *********************/
    presets.zoom_in = createActionPreset(
        self,
        'zoom_in',
        'Lens',
        'Zoom In',
        'zoom_in_action',
        { zoom_in: '3' }
    );

    presets.zoom_out = createActionPreset(
        self,
        'zoom_out',
        'Lens',
        'Zoom Out',
        'zoom_out_action',
        { zoom_out: '3' }
    );

    presets.zoom_stop = createActionPreset(
        self,
        'zoom_stop',
        'Lens',
        'Zoom Stop',
        'zoom_stop_action',
        {}
    );

   

    /*********************
     对焦预设
    *********************/
    presets.focus_auto = createActionPreset(
        self,
        'focus_auto',
        'Lens',
        'Focus Auto',
        'focus_action',
        { focus: '3802' }
    );

    presets.focus_manual = createActionPreset(
        self,
        'focus_manual',
        'Lens',
        'Focus Manual',
        'focus_action',
        { focus: '3803' }
    );

    presets.focus_far = createFocusPreset(
        self,
        'focus_far',
        'Lens',
        'Focus Far',
        '0802'
    );

    presets.focus_near = createFocusPreset(
        self,
        'focus_near',
        'Lens',
        'Focus Near',
        '0803'
    );

    presets.focus_far_var = createFocusPreset(
        self,
        'focus_far_var',
        'Lens',
        'Focus Far (var)',
        '082',
        3
    );

    presets.focus_near_var = createFocusPreset(
        self,
        'focus_near_var',
        'Lens',
        'Focus Near (var)',
        '083',
        3
    );

    presets.focus_op = createActionPreset(
        self,
        'focus_op',
        'Lens',
        'Focus 1 push',
        'focus_action',
        { focus: '1801' }
    );

    presets.focus_stop = createActionPreset(
        self,
        'focus_stop',
        'Lens',
        'Focus Stop',
        'focus_action',
        { focus: '0800' }
    );

    /*********************
     曝光控制预设
    *********************/
    presets.auto_exposure_bright = createActionPreset(
        self,
        'auto_exposure_bright',
        'Exposure',
        'Auto Exposure Bright',
        'auto_exposure_action',
        { auto_exposure: '0D' }
    );

    presets.auto_exposure_full_auto = createActionPreset(
        self,
        'auto_exposure_full_auto',
        'Exposure',
        'Auto Exposure Full Auto',
        'auto_exposure_action',
        { auto_exposure: '00' }
    );

    presets.auto_exposure_iris_priority = createActionPreset(
        self,
        'auto_exposure_iris_priority',
        'Exposure',
        'Auto Exposure Iris Priority',
        'auto_exposure_action',
        { auto_exposure: '0B' }
    );

    presets.auto_exposure_manual = createActionPreset(
        self,
        'auto_exposure_manual',
        'Exposure',
        'Auto Exposure Manual',
        'auto_exposure_action',
        { auto_exposure: '03' }
    );

    presets.auto_exposure_shutter_priority = createActionPreset(
        self,
        'auto_exposure_shutter_priority',
        'Exposure',
        'Auto Exposure Shutter Priority',
        'auto_exposure_action',
        { auto_exposure: '0A' }
    );

    presets.gain_up = createActionPreset(
        self,
        'gain_up',
        'Exposure',
        'Gain +',
        'gain_action',
        { gain: '02' }
    );

    presets.gain_down = createActionPreset(
        self,
        'gain_down',
        'Exposure',
        'Gain -',
        'gain_action',
        { gain: '03' }
    );

    presets.iris_up = createActionPreset(
        self,
        'iris_up',
        'Exposure',
        'Iris +',
        'iris_action',
        { iris: '02' }
    );

    presets.iris_down = createActionPreset(
        self,
        'iris_down',
        'Exposure',
        'Iris -',
        'iris_action',
        { iris: '03' }
    );

    presets.shutter_up = createActionPreset(
        self,
        'shutter_up',
        'Exposure',
        'Shutter +',
        'shutter_action',
        { shutter: '02' }
    );

    presets.shutter_down = createActionPreset(
        self,
        'shutter_down',
        'Exposure',
        'Shutter -',
        'shutter_action',
        { shutter: '03' }
    );

    presets.exposure_comp_up = createActionPreset(
        self,
        'exposure_comp_up',
        'Exposure',
        'Exposure Comp +',
        'exposure_comp_action',
        { exposure_comp: '02' }
    );

    presets.exposure_comp_down = createActionPreset(
        self,
        'exposure_comp_down',
        'Exposure',
        'Exposure Comp -',
        'exposure_comp_action',
        { exposure_comp: '03' }
    );

    presets.red_gain_up = createActionPreset(
        self,
        'red_gain_up',
        'White Balance',
        'Red Gain +',
        'red_gain_action',
        { red_gain: '0302' }
    );

    presets.red_gain_down = createActionPreset(
        self,
        'red_gain_down',
        'White Balance',
        'Red Gain -',
        'red_gain_action',
        { red_gain: '0303' }
    );

    presets.blue_gain_up = createActionPreset(
        self,
        'blue_gain_up',
        'White Balance',
        'Blue Gain +',
        'blue_gain_action',
        { blue_gain: '0402' }
    );

    presets.blue_gain_down = createActionPreset(
        self,
        'blue_gain_down',
        'White Balance',
        'Blue Gain -',
        'blue_gain_action',
        { blue_gain: '0403' }
    );

    /*********************
     白平衡预设
    *********************/
    presets.wb_auto = createActionPreset(
        self,
        'wb_auto',
        'White Balance',
        'WB Auto',
        'wb_action',
        { white_balance: '3500' }
    );

    presets.wb_atw = createActionPreset(
        self,
        'wb_atw',
        'White Balance',
        'WB ATW',
        'wb_action',
        { white_balance: '3504' }
    );

    presets.wb_indoor = createActionPreset(
        self,
        'wb_indoor',
        'White Balance',
        'WB Indoor',
        'wb_action',
        { white_balance: '3501' }
    );

    presets.wb_outdoor = createActionPreset(
        self,
        'wb_outdoor',
        'White Balance',
        'WB Outdoor',
        'wb_action',
        { white_balance: '3502' }
    );

    presets.wb_1_push_wb_mode = createActionPreset(
        self,
        'wb_1_push_wb_mode',
        'White Balance',
        '1 push WB mode',
        'wb_action',
        { white_balance: '3503' }
    );

    presets.wb_1_push_trigger = createActionPreset(
        self,
        'wb_1_push_trigger',
        'White Balance',
        '1 push trigger',
        'wb_action',
        { white_balance: '1005' }
    );
        presets.wb_manual = createActionPreset(
        self,
        'wb_manual',
        'White Balance',
        'WB Manual',
        'wb_action',
        { white_balance: '3505' }
    );

    /*********************
     系统预设
    *********************/
    presets.menu_toggle = createActionPreset(
        self,
        'menu_toggle',
        'System',
        'Menu On/Off',
        'menu_action',
        {}
    );

    presets.menu_enter = createActionPreset(
        self,
        'menu_enter',
        'System',
        'Menu Enter',
        'menu_enter_action',
        {}
    );

    presets.on_screen_display = createActionPreset(
        self,
        'on_screen_display',
        'System',
        'On Screen Display',
        'osd_action',
        {}
    );

    presets.freeze_on = createActionPreset(
        self,
        'freeze_on',
        'System',
        'Freeze On',
        'freeze_action',
        { freeze: '02' }
    );

    presets.freeze_off = createActionPreset(
        self,
        'freeze_off',
        'System',
        'Freeze Off',
        'freeze_action',
        { freeze: '03' }
    );

    presets.freeze_preset_on = createActionPreset(
        self,
        'freeze_preset_on',
        'System',
        'Freeze Preset On',
        'freeze_action',
        { freeze: '22' }
    );

    presets.freeze_preset_off = createActionPreset(
        self,
        'freeze_preset_off',
        'System',
        'Freeze Preset Off',
        'freeze_action',
        { freeze: '23' }
    );

    /*********************
     跟踪预设
    *********************/
    presets.auto_tracking_on = createActionPreset(
        self,
        'auto_tracking_on',
        'Tracking',
        'Auto Tracking On',
        'auto_tracking_action',
        { auto_tracking: '02' }
    );

    presets.auto_tracking_off = createActionPreset(
        self,
        'auto_tracking_off',
        'Tracking',
        'Auto Tracking Off',
        'auto_tracking_action',
        { auto_tracking: '03' }
    );

    /*********************
     预设调用
    *********************/
    for (let i = 0; i < 10; i++) {
        presets[`preset_recall_${i}`] = createActionPreset(
            self,
            `preset_recall_${i}`,
            'Presets',
            `Recall Preset ${i}`,
            'preset_action',
            {
                preset: '02',
                num: i
            }
        );

        presets[`preset_save_${i}`] = createActionPreset(
            self,
            `preset_save_${i}`,
            'Presets',
            `Save Preset ${i}`,
            'preset_action',
            {
                preset: '01',
                num: i
            }
        );
    }

    console.log('Generated presets:', Object.keys(presets).length);
    self.setPresetDefinitions(presets);
};