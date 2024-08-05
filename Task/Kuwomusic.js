/*
APP：酷我音乐
版本：10.6.6


脚本功能：看广告，获取更多的免费听歌时间！不管你有没有刷广告入口都能用

更新：优化通知，更新多账号支持,更新Boxjs定阅(https://raw.githubusercontent.com/General74110/Quantumult-X/master/Boxjs/General74110.json)

操作：点击 我的-用户昵称 获取Cookies！获取完后关掉重写，避免不必要的MITM


注意⚠️：当前脚本只测试Loon，其他自测！
可配合其他酷我音乐会员脚本去掉部分广告（没时间搞广告）




使用声明：⚠️⚠️⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

[Script]
http-request ^https:\/\/integralapi\.kuwo\.cn\/api\/v1\/online\/sign\/v1\/music\/userBase\? script-path=https://raw.githubusercontent.com/General74110/Quantumult-X/master/Task/Kuwomusic.js, requires-body=true, timeout=10, enabled=true, tag=酷我音乐刷时长获取Cookie, img-url=https://raw.githubusercontent.com/LovedGM/Quantumult-X-TuBiao/main/zishi-cs/zs23.png


[Task]
cron "30 6 * * *" script-path=https://raw.githubusercontent.com/General74110/Quantumult-X/master/Task/Kuwomusic.js, timeout=3600, tag=酷我音乐刷时长, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/KKTV.png


[MITM]
hostname = integralapi.kuwo.cn

*/

const $ = new Env('酷我音乐');
var _0xod7 = 'jsjiami.com.v7'; const _0x5a6816 = _0x719e; (function (_0x2eb68d, _0x3d654f, _0x2e6a44, _0x5ebbf6, _0x127768, _0x5db6b6, _0x1be6b9) { return _0x2eb68d = _0x2eb68d >> 0x5, _0x5db6b6 = 'hs', _0x1be6b9 = 'hs', function (_0xeb05d6, _0x384d20, _0x2ed90f, _0x2a28ea, _0x2c250e) { const _0x3902e6 = _0x719e; _0x2a28ea = 'tfi', _0x5db6b6 = _0x2a28ea + _0x5db6b6, _0x2c250e = 'up', _0x1be6b9 += _0x2c250e, _0x5db6b6 = _0x2ed90f(_0x5db6b6), _0x1be6b9 = _0x2ed90f(_0x1be6b9), _0x2ed90f = 0x0; const _0x163126 = _0xeb05d6(); while (!![] && --_0x5ebbf6 + _0x384d20) { try { _0x2a28ea = -parseInt(_0x3902e6(0x127, ')G4J')) / 0x1 + parseInt(_0x3902e6(0x18a, 'v9T8')) / 0x2 + parseInt(_0x3902e6(0x8c, '1gsg')) / 0x3 * (-parseInt(_0x3902e6(0x12b, '1gsg')) / 0x4) + -parseInt(_0x3902e6(0xb5, 'eHu!')) / 0x5 + -parseInt(_0x3902e6(0x90, 'Vq&Z')) / 0x6 * (-parseInt(_0x3902e6(0xe5, 'qOFG')) / 0x7) + parseInt(_0x3902e6(0x13c, ']@h*')) / 0x8 * (-parseInt(_0x3902e6(0x10d, 'KSBU')) / 0x9) + parseInt(_0x3902e6(0x158, 'Cl^W')) / 0xa; } catch (_0xdc0c4c) { _0x2a28ea = _0x2ed90f; } finally { _0x2c250e = _0x163126[_0x5db6b6](); if (_0x2eb68d <= _0x5ebbf6) _0x2ed90f ? _0x127768 ? _0x2a28ea = _0x2c250e : _0x127768 = _0x2c250e : _0x2ed90f = _0x2c250e; else { if (_0x2ed90f == _0x127768['replace'](/[ykMdLPRqSIuDbYAnCQKgt=]/g, '')) { if (_0x2a28ea === _0x384d20) { _0x163126['un' + _0x5db6b6](_0x2c250e); break; } _0x163126[_0x1be6b9](_0x2c250e); } } } } }(_0x2e6a44, _0x3d654f, function (_0x10a55c, _0x584e16, _0x15db39, _0x3d65e7, _0x4f5421, _0x5e9143, _0x23e849) { return _0x584e16 = '\x73\x70\x6c\x69\x74', _0x10a55c = arguments[0x0], _0x10a55c = _0x10a55c[_0x584e16](''), _0x15db39 = '\x72\x65\x76\x65\x72\x73\x65', _0x10a55c = _0x10a55c[_0x15db39]('\x76'), _0x3d65e7 = '\x6a\x6f\x69\x6e', (0x1790fa, _0x10a55c[_0x3d65e7]('')); }); }(0x1880, 0x7e078, _0x53ff, 0xc6), _0x53ff) && (_0xod7 = _0x53ff); const Clear = $[_0x5a6816(0x184, '1gsg')]('Clear') || 0x0; function _0x719e(_0x14064c, _0x231250) { const _0x53ffe2 = _0x53ff(); return _0x719e = function (_0x719ec, _0x1b5cc8) { _0x719ec = _0x719ec - 0x82; let _0x3d9818 = _0x53ffe2[_0x719ec]; if (_0x719e['KAkwQH'] === undefined) { var _0x53bdc7 = function (_0x1fd9c1) { const _0x356bc5 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='; let _0x18f063 = '', _0x2bfbc9 = ''; for (let _0x44d739 = 0x0, _0x71f6a, _0x12308a, _0x2f8f9e = 0x0; _0x12308a = _0x1fd9c1['charAt'](_0x2f8f9e++); ~_0x12308a && (_0x71f6a = _0x44d739 % 0x4 ? _0x71f6a * 0x40 + _0x12308a : _0x12308a, _0x44d739++ % 0x4) ? _0x18f063 += String['fromCharCode'](0xff & _0x71f6a >> (-0x2 * _0x44d739 & 0x6)) : 0x0) { _0x12308a = _0x356bc5['indexOf'](_0x12308a); } for (let _0x3b43b1 = 0x0, _0x4c8a87 = _0x18f063['length']; _0x3b43b1 < _0x4c8a87; _0x3b43b1++) { _0x2bfbc9 += '%' + ('00' + _0x18f063['charCodeAt'](_0x3b43b1)['toString'](0x10))['slice'](-0x2); } return decodeURIComponent(_0x2bfbc9); }; const _0x28409e = function (_0x2ff2ef, _0x309379) { let _0x14216c = [], _0x1c6694 = 0x0, _0x250fa9, _0x1cee52 = ''; _0x2ff2ef = _0x53bdc7(_0x2ff2ef); let _0x26b250; for (_0x26b250 = 0x0; _0x26b250 < 0x100; _0x26b250++) { _0x14216c[_0x26b250] = _0x26b250; } for (_0x26b250 = 0x0; _0x26b250 < 0x100; _0x26b250++) { _0x1c6694 = (_0x1c6694 + _0x14216c[_0x26b250] + _0x309379['charCodeAt'](_0x26b250 % _0x309379['length'])) % 0x100, _0x250fa9 = _0x14216c[_0x26b250], _0x14216c[_0x26b250] = _0x14216c[_0x1c6694], _0x14216c[_0x1c6694] = _0x250fa9; } _0x26b250 = 0x0, _0x1c6694 = 0x0; for (let _0x40595b = 0x0; _0x40595b < _0x2ff2ef['length']; _0x40595b++) { _0x26b250 = (_0x26b250 + 0x1) % 0x100, _0x1c6694 = (_0x1c6694 + _0x14216c[_0x26b250]) % 0x100, _0x250fa9 = _0x14216c[_0x26b250], _0x14216c[_0x26b250] = _0x14216c[_0x1c6694], _0x14216c[_0x1c6694] = _0x250fa9, _0x1cee52 += String['fromCharCode'](_0x2ff2ef['charCodeAt'](_0x40595b) ^ _0x14216c[(_0x14216c[_0x26b250] + _0x14216c[_0x1c6694]) % 0x100]); } return _0x1cee52; }; _0x719e['Mqfvew'] = _0x28409e, _0x14064c = arguments, _0x719e['KAkwQH'] = !![]; } const _0xd74f30 = _0x53ffe2[0x0], _0x38005a = _0x719ec + _0xd74f30, _0x1a2fc3 = _0x14064c[_0x38005a]; return !_0x1a2fc3 ? (_0x719e['doLSPo'] === undefined && (_0x719e['doLSPo'] = !![]), _0x3d9818 = _0x719e['Mqfvew'](_0x3d9818, _0x1b5cc8), _0x14064c[_0x38005a] = _0x3d9818) : _0x3d9818 = _0x1a2fc3, _0x3d9818; }, _0x719e(_0x14064c, _0x231250); } let status; status = (status = $['getval']('kuwostatus') || '1') > 0x1 ? '' + status : ''; let loginUidArr = [], kuwoNameArr = [], tz = $[_0x5a6816(0x180, 'IV%4')]('tz') || '1'; const logs = 0x0; var message = ''; !(async () => { const _0x1e882 = _0x5a6816, _0x3de433 = { 'MrvIa': function (_0x5b9b83, _0x376afd) { return _0x5b9b83 == _0x376afd; }, 'VlHse': function (_0x49b6c3, _0x4f20eb) { return _0x49b6c3(_0x4f20eb); }, 'KXkjl': function (_0x42c0ca, _0x3710d6) { return _0x42c0ca + _0x3710d6; }, 'DmAiX': function (_0x505b96, _0x1967ca) { return _0x505b96 + _0x1967ca; }, 'rjLDe': function (_0x517d81, _0x5745dc) { return _0x517d81 + _0x5745dc; }, 'qbRqZ': function (_0x35daa8, _0x2f975c) { return _0x35daa8 + _0x2f975c; }, 'lmNeD': _0x1e882(0x84, 'KSBU'), 'JatmZ': _0x1e882(0x178, 'v9T8'), 'wsYYZ': _0x1e882(0x191, 'kEiQ'), 'lgKle': function (_0x506a0f, _0x457577) { return _0x506a0f(_0x457577); }, 'XugtV': function (_0x2fddbd, _0x2ddf55) { return _0x2fddbd + _0x2ddf55; }, 'vOVAQ': _0x1e882(0xce, ')ivc'), 'VZSWV': _0x1e882(0xe3, 'VTVG'), 'IyVyK': _0x1e882(0xf4, ')G4J'), 'sWpil': function (_0x2bd44a, _0x2eaf1f) { return _0x2bd44a !== _0x2eaf1f; }, 'udESX': 'CxiqW', 'NnFYA': function (_0x2c750c) { return _0x2c750c(); }, 'WIEjT': _0x1e882(0xf7, 'r7Dq'), 'LOKWx': function (_0x1a66c2, _0x5edc76) { return _0x1a66c2 === _0x5edc76; }, 'lgrdv': 'Lmzsk', 'BjQEN': function (_0x3c2ae3, _0x4bd58e) { return _0x3c2ae3 < _0x4bd58e; }, 'XhKlq': function (_0xda9a85, _0x30dfff) { return _0xda9a85 + _0x30dfff; }, 'VkFOA': function (_0xe2943f, _0x2543b1) { return _0xe2943f * _0x2543b1; }, 'qVrZV': function (_0x1557a5, _0x13af0d) { return _0x1557a5 * _0x13af0d; }, 'gNYNR': function (_0x8aef64, _0x44b897) { return _0x8aef64 * _0x44b897; }, 'XbIYF': function (_0x44aa17, _0xd7d79c) { return _0x44aa17 < _0xd7d79c; }, 'QdPfl': function (_0x5d7683, _0x463121) { return _0x5d7683(_0x463121); }, 'fMUWn': 'tfUhb', 'GEUrh': 'YqXOO', 'bTuCK': _0x1e882(0xef, 'a9AK'), 'XaGKj': function (_0x56ac37, _0x2b3608) { return _0x56ac37 < _0x2b3608; }, 'cfMbo': _0x1e882(0x140, '4PeQ'), 'jJaCk': 'ZaNbK', 'JzoEV': function (_0x40c7c1, _0x476640) { return _0x40c7c1(_0x476640); }, 'bEWLE': function (_0x46f54a, _0x4c8e31) { return _0x46f54a / _0x4c8e31; } }; if (Clear == 0x1) { if (_0x3de433[_0x1e882(0xbe, '$DMm')](_0x3de433[_0x1e882(0x16b, '2tNu')], _0x3de433[_0x1e882(0x102, 'aOBr')])) { _0x22adde = _0x58ae81[_0x1e882(0x189, 'm]wh')](_0x33b449); if (_0x3de433[_0x1e882(0x9a, 'v9T8')](_0x2a9de8['code'], 0xc8)) { let _0x409a06 = _0x2cc707[_0x1e882(0x15a, 'zxh)')]['endTime'], _0x189708 = new _0x4cfe85(_0x3de433[_0x1e882(0xa1, ')ivc')](_0x3c506b, _0x409a06)), _0x31df6c = _0x189708[_0x1e882(0x124, ')ivc')](); _0x25cb52['log'](_0x3de433[_0x1e882(0x126, 'r7Dq')](_0x3de433[_0x1e882(0xdf, 'KSBU')](_0x3de433['DmAiX'](_0x3de433['rjLDe'](_0x3de433[_0x1e882(0x15e, 'GWen')](_0x2aadc5[_0x1e882(0x91, 'KSBU')], _0x1e882(0x9e, 'VTVG')), _0x3de433[_0x1e882(0x165, 'iM!b')]), _0x45c9e2[_0x1e882(0x194, ')G4J')][_0x1e882(0xb7, 'Yb]O')]) + _0x3de433['JatmZ'], _0x3de433[_0x1e882(0x16a, 'GWen')]), _0x31df6c)), _0x3de433['lgKle'](_0x2d4c97, { 'success': !![], 'singleTime': _0x3de433['VlHse'](_0xb42bf8, _0x5100d6['data']['singleTime']), 'expiryTime': _0x31df6c, 'message': _0x3de433[_0x1e882(0x136, 'Cl^W')](_0x567208['msg'], '!✅') }); } else _0x32cc08[_0x1e882(0x15b, '%Bo9')] === -0x1 ? (_0x4acf2a['log'](_0x3de433[_0x1e882(0x95, ']vxk')](_0x5a6cef[_0x1e882(0x122, 'tznY')], _0x3de433['vOVAQ'])), _0x3de433[_0x1e882(0xc2, 'j*@O')](_0xa598fe, { 'success': ![], 'singleTime': 0x0, 'expiryTime': '', 'message': _0x18a713['msg'] + _0x1e882(0xf5, '$@!f') })) : (_0x4727ab[_0x1e882(0xa4, 'oPVz')](_0x4df897[_0x1e882(0x89, '5W^u')] + _0x3de433[_0x1e882(0xa0, 'tznY')]), _0x3de433[_0x1e882(0x9c, '$@!f')](_0xe3a9d7, { 'success': ![], 'singleTime': 0x0, 'expiryTime': '', 'message': _0x3de433['XugtV'](_0x437b34[_0x1e882(0xc8, '$DMm')], _0x3de433[_0x1e882(0xe6, 'qOFG')]) })); } else { _0x3de433[_0x1e882(0x14e, 'iM!b')](clearEnvVars), $[_0x1e882(0x11f, 'zzf*')]($[_0x1e882(0xf2, 'zzf*')], '', _0x3de433[_0x1e882(0x10e, 'UzZM')]); return; } } if (typeof $request !== _0x1e882(0x11c, '1gsg')) await kuwock(); else { if (_0x3de433['LOKWx']('xhDzX', _0x3de433[_0x1e882(0x8f, 'gLXf')])) _0x53ebe1 += _0x21f27f[_0x1e882(0xcf, 'tznY')], _0x46e00c = _0x44a26f[_0x1e882(0xba, '$@!f')], _0x5d58f0 = _0x5c426d[_0x1e882(0xaa, 'Q*aQ')]; else { const _0x2b6d5e = $[_0x1e882(0x184, '1gsg')](_0x3de433['IyVyK']); _0x2b6d5e && (loginUidArr = _0x2b6d5e[_0x1e882(0xa3, 'GWen')]('&')); for (let _0x2850e6 = 0x0; _0x3de433['BjQEN'](_0x2850e6, loginUidArr['length']); _0x2850e6++) { kuwoNameArr[_0x1e882(0x171, ']xp]')]('用户' + _0x3de433[_0x1e882(0x8b, 'GWen')](_0x2850e6, 0x1)); } $[_0x1e882(0x17f, 'GWen')]('\x0a\x0a============General℡=========================\x20脚本执行\x20-\x20北京时间(UTC+8)：' + new Date(_0x3de433[_0x1e882(0xbf, 'v9T8')](_0x3de433[_0x1e882(0x10f, 'qOFG')](new Date()[_0x1e882(0xf1, 'Yb]O')](), _0x3de433['VkFOA'](_0x3de433[_0x1e882(0x155, 'GaoH')](new Date()[_0x1e882(0xe9, ']xp]')](), 0x3c), 0x3e8)), _0x3de433[_0x1e882(0xa7, 'r7Dq')](_0x3de433[_0x1e882(0x157, 'a9AK')](_0x3de433[_0x1e882(0x144, '4PeQ')](0x8, 0x3c), 0x3c), 0x3e8)))[_0x1e882(0x8e, 'eHu!')]() + _0x1e882(0xe4, '5W^u')), $['log'](_0x1e882(0xd9, 'zxh)') + loginUidArr[_0x1e882(0x104, 'tznY')] + '\x20个有效用户数据'); for (let _0xe10b93 = 0x0; _0x3de433[_0x1e882(0xfb, '^*zT')](_0xe10b93, loginUidArr[_0x1e882(0xc9, 'jXnh')]); _0xe10b93++) { let _0x51a0c = loginUidArr[_0xe10b93]; const _0x2ae163 = await _0x3de433[_0x1e882(0x125, 'g61A')](getNickname, _0x51a0c); _0x2ae163 && (_0x3de433['fMUWn'] !== _0x3de433['GEUrh'] ? kuwoNameArr[_0xe10b93] = _0x2ae163 : _0x18af10[_0x1e882(0xd5, 'j*@O')]('', _0x3de433['IyVyK'])); $['log'](_0x3de433[_0x1e882(0x145, '$DMm')]); let _0x1ba6d6 = 0x0, _0x4d0171 = '', _0x567f50 = ''; const _0x1a4817 = _0x3de433[_0x1e882(0xd6, 'oPVz')](Math['floor'](_0x3de433[_0x1e882(0x123, ']vxk')](Math[_0x1e882(0xae, 'aOBr')](), 0x32)), 0x32); for (let _0x4a29bd = 0x0; _0x3de433[_0x1e882(0xa6, 'oPVz')](_0x4a29bd, _0x1a4817); _0x4a29bd++) { if (_0x3de433['LOKWx'](_0x3de433['cfMbo'], _0x3de433['jJaCk'])) _0x459e75[_0x1e882(0xc0, 'Q*aQ')](_0x1bd859); else { $[_0x1e882(0x137, 'iM!b')] = _0x4a29bd + 0x1, $[_0x1e882(0x11e, 'r7Dq')](_0x1e882(0xa2, ']vxk') + $['index'] + _0x1e882(0x83, 'Aquz')); const _0x57b84d = await _0x3de433[_0x1e882(0x181, 'v9T8')](Task, _0x51a0c); _0x57b84d[_0x1e882(0x14c, 'GaoH')] && (_0x1ba6d6 += _0x57b84d[_0x1e882(0xc3, 'zzf*')], _0x4d0171 = _0x57b84d[_0x1e882(0x92, 'jXnh')], _0x567f50 = _0x57b84d[_0x1e882(0x15f, 'a9AK')]), await $['wait'](0x3e8); } } const _0x1423b9 = _0x3de433[_0x1e882(0x185, 'aOBr')](_0x1ba6d6, 0x3c)['toFixed'](0x2); message = _0x1e882(0x138, 'zxh)') + kuwoNameArr[_0xe10b93] + _0x1e882(0x14a, 'zxh)') + _0x567f50 + _0x1e882(0xa9, ')ivc') + _0x1423b9 + '\x20小时🥳\x0a免费听歌到期时间:\x20' + _0x4d0171 + _0x1e882(0xbd, 'r7Dq'), await _0x3de433['NnFYA'](showmsg); } } } })()[_0x5a6816(0x10a, ')ivc')](_0x53f745 => $[_0x5a6816(0x87, '2tNu')](_0x53f745))['finally'](() => $['done']()); function clearEnvVars() { const _0x3b1aaa = _0x5a6816, _0x16102b = { 'HkjaZ': 'loginUid' }; $[_0x3b1aaa(0x143, 'VTVG')]('', _0x16102b['HkjaZ']); } async function kuwock() { const _0x556085 = _0x5a6816, _0x563738 = { 'IaGkH': _0x556085(0xb1, 'GaoH'), 'kWCTR': function (_0x50d4cb, _0x7fbab1) { return _0x50d4cb(_0x7fbab1); }, 'blouf': function (_0x4fc35b, _0xbbadfc) { return _0x4fc35b(_0xbbadfc); }, 'wUTCN': function (_0xf89bef, _0x2b6368) { return _0xf89bef > _0x2b6368; }, 'fahSj': 'sign/v1/music/userBase', 'nMhrG': function (_0x2921d9, _0x3e2f50) { return _0x2921d9 !== _0x3e2f50; }, 'HkWgs': 'WxKWQ', 'AiWWK': _0x556085(0x99, '2tNu'), 'sUbwM': function (_0xb86cc5, _0x42fde7) { return _0xb86cc5(_0x42fde7); }, 'kdLKJ': function (_0x4b712f, _0x2f36e7) { return _0x4b712f === _0x2f36e7; }, 'udwCI': _0x556085(0x15d, '2tNu') }; if (_0x563738['wUTCN']($request[_0x556085(0x12a, 'eHu!')]['indexOf'](_0x563738[_0x556085(0x177, ']@h*')]), -0x1)) { if (_0x563738[_0x556085(0x16e, '%upr')](_0x556085(0x179, 'kEiQ'), _0x563738[_0x556085(0xfe, 'VTVG')])) { _0x18f063(), _0x2bfbc9['msg'](_0x44d739[_0x556085(0x129, 'qOFG')], '', _0x563738[_0x556085(0xfa, ')ivc')]); return; } else { const _0x2547ed = $request[_0x556085(0x16f, 'I03t')], _0x3a531d = _0x2547ed['split']('?')[0x1][_0x556085(0x12c, 'f[IS')]('&'); let _0xc4414f; for (const _0x56d5c1 of _0x3a531d) { const [_0x18c023, _0x552aa6] = _0x56d5c1[_0x556085(0xe7, 'v9T8')]('='); _0x18c023 === _0x563738[_0x556085(0xd3, 'tznY')] && (_0xc4414f = _0x552aa6); } if (!_0xc4414f) { $['log'](_0x556085(0x17c, 'zxh)')); return; } const _0x2dfba6 = $[_0x556085(0x153, 'I[UL')](_0x556085(0x190, 'gLXf')) || '', _0x563c5a = _0x2dfba6 ? _0xc4414f[_0x556085(0xc4, 'I[UL')]('&') : [], _0x3cc241 = await _0x563738[_0x556085(0xc6, 's!&*')](getNickname, _0xc4414f); if (_0x563c5a[_0x556085(0xd7, 'kEiQ')](_0xc4414f)) $['setdata'](_0x3cc241, 'nickname' + _0xc4414f), $['log']('【' + _0x3cc241 + '】更新Cookie成功'), $[_0x556085(0x15c, 'I03t')]($['name'], '', '【' + _0x3cc241 + _0x556085(0x11d, '%Bo9')); else { if (_0x563738[_0x556085(0xdc, 'IV%4')](_0x556085(0x175, '^*zT'), _0x563738[_0x556085(0x18c, ')G4J')])) { if (_0x2f9435) { _0x2fb09e['logErr'](_0x556085(0xee, 'zzf*') + _0x2df821), _0x563738[_0x556085(0x117, 'qOFG')](_0x3ff2f5, ''); return; } _0x44f9cd = _0x5326bd[_0x556085(0xea, 'DBiC')](_0x257e36); const _0x3da839 = _0x2a2148['data'][_0x556085(0x151, 'zzf*')]; _0x563738[_0x556085(0x14d, 'tznY')](_0x10ea61, _0x3da839); } else _0x563c5a[_0x556085(0xd0, 'DBiC')](_0xc4414f), $[_0x556085(0x8d, 'a9AK')](_0x563c5a['join']('&'), _0x563738[_0x556085(0x162, 'zxh)')]), $['setdata'](_0x3cc241, _0x556085(0x118, 'iM!b') + _0xc4414f), $[_0x556085(0xdd, '$DMm')](_0x556085(0x110, 'm]wh') + _0x3cc241 + '】的Cookie成功'), $[_0x556085(0x17e, 'FWSE')]($[_0x556085(0x149, 'Q*aQ')], '', '【' + _0x3cc241 + _0x556085(0xe1, 'Q*aQ')); } } } } function getNickname(_0x2a037e) { const _0x76e15d = { 'sYACm': function (_0x5a63fd, _0x19d886) { return _0x5a63fd + _0x19d886; }, 'xamfH': '八成Cookie掉了🆘', 'dFwSX': function (_0x50ff5e, _0x43923b) { return _0x50ff5e(_0x43923b); }, 'kCVaJ': function (_0x5afaeb, _0x4f987) { return _0x5afaeb + _0x4f987; }, 'yoEAc': function (_0x5de09e, _0x47b957) { return _0x5de09e === _0x47b957; } }; return new Promise(_0x443fbc => { const _0x24791e = _0x719e, _0x35a09a = { 'xJrTF': function (_0x1333c7, _0x51907e) { const _0x553923 = _0x719e; return _0x76e15d[_0x553923(0x17d, 'x1XH')](_0x1333c7, _0x51907e); }, 'plejZ': _0x76e15d['xamfH'], 'Axgeo': function (_0x48f75b, _0x4e4bf7) { const _0x741e2d = _0x719e; return _0x76e15d[_0x741e2d(0xde, 'Q*aQ')](_0x48f75b, _0x4e4bf7); }, 'zfrus': function (_0x47fe1b, _0x368ec8) { return _0x76e15d['kCVaJ'](_0x47fe1b, _0x368ec8); }, 'eGgXh': function (_0x4ac6b5, _0x13e505) { const _0x4aaca1 = _0x719e; return _0x76e15d[_0x4aaca1(0xbb, 'r7Dq')](_0x4ac6b5, _0x13e505); } }, _0x506f45 = _0x24791e(0xdb, 'j*@O') + _0x2a037e; $[_0x24791e(0xfd, 's!&*')](_0x506f45, (_0x13f306, _0x1f8dd4, _0x1248bf) => { const _0xe1eb11 = _0x24791e; try { if (_0x13f306) { if (_0xe1eb11(0xc5, ']@h*') === _0xe1eb11(0x135, ')G4J')) _0x132701['setdata'](_0x65bc15, _0xe1eb11(0x86, ')ivc') + _0x5a0159), _0x33f217['log']('【' + _0x583030 + _0xe1eb11(0x152, 'a9AK')), _0x199109['msg'](_0x3e2b7b[_0xe1eb11(0x176, 'f[IS')], '', '【' + _0x9878c3 + '】更新Cookies成功'); else { $[_0xe1eb11(0xbc, 'a9AK')](_0xe1eb11(0xd2, '4PeQ') + _0x13f306), _0x35a09a[_0xe1eb11(0xac, 'tznY')](_0x443fbc, ''); return; } } _0x1248bf = JSON['parse'](_0x1248bf); const _0x26575e = _0x1248bf['data']['nickname']; _0x35a09a['Axgeo'](_0x443fbc, _0x26575e); } catch (_0x5f1c1a) { _0x35a09a[_0xe1eb11(0x121, 'iM!b')]('vAiNE', 'cqxIB') ? (_0x2ad9bd[_0xe1eb11(0xeb, 'aOBr')](_0x35a09a[_0xe1eb11(0x107, 'v9T8')](_0x37a909['msg'], _0x35a09a['plejZ'])), _0x35a09a[_0xe1eb11(0xed, 'DBiC')](_0x12dc2d, { 'success': ![], 'singleTime': 0x0, 'expiryTime': '', 'message': _0x35a09a[_0xe1eb11(0x96, 'Yb]O')](_0x1afe4e[_0xe1eb11(0xf9, 'GaoH')], _0x35a09a['plejZ']) })) : ($[_0xe1eb11(0x192, 'Yb]O')](_0x5f1c1a), _0x35a09a[_0xe1eb11(0x188, 'GaoH')](_0x443fbc, '')); } }); }); } function _0x53ff() { const _0x4dbf40 = (function () { return [_0xod7, 'dIDjnsgjItPiuKaktmLyiR.YQcboqbm.yvC7MASC==', 'ta1F', 'iXBcIeVcTCkuW444', 'aKjWWPGs', 'trtcIG', 'EmkHWP5Nma', 'W45ZWRpdHmoxsmoMW5FdLrHbB8koW64', 'ysZcQrlcOW', 'WQfvWQr3bq', 'hCoDDWaZWOlcH8ktDw9VW60', 'sSkTWO/dS8k1', 'DSk2WPdcUq', 'gCkiWRK', 'jSoioeldK2ZcKL1yWPezW6q', 'W7PNhbal', 'WRVdQSk8WRVdJW', 'CSkDsJhcNa', 'WOFdOYFcKaLzpJLR', '44oe6i6W5y2vpgzfd8owWP055OQW5yIv', 'WQhdSqVdNNpdQM7dGgtdVmoRpSkF', 'W4HUWRapW6e', 'W4BdRSkCW6RdQG', 'W53dL8kD', 'zCkLkKXZ', 'W4ldVuxcNwe', 'dMTZWQuc', 'yoobRocNTG', 'W7P+hH4tFLf8pCoG', 'CvBdMHldTHbkrcBcLHTeWR3cMa', 'WOJdTXBdGg4', 'W6q1WRrkor4ZW7NcRZRdK8of', 'WPRdRmoUCYO', 'l8oYfCoudq', 'tSoClJhdNa', 'W5ddL8k9W6tdNq', 'ggKCemok', 'W7XahuRdUG', 'of/cTmkWWO/cR2q', 'W4RdPmkZW4/dIq', 'DSkvmmk+jW', 'h8kfeei', 'WO9vWQDApa', 'WQddGXm', 'g8o4hCol', '4kEp44gTwCkY', 'WPDQwrG', 'WOb+tHRdPSoXW5S', 'qGVcGSkOW4a', 'kwTrWPK7', 'W5ddJ1hcPfi', 'ExhcOG', 'tXDBWQJcR1TozG', '44cm5PIa5PwYW7pcOWhdKCoHbEAjN+wjTa', 'nvOMn8oJl8kz', 'WRLyW79OsXpdVKjUl2fFWQaxW7mpdHZcNmksm059WQ7cSmoPWO3cHSktW4hcL8omW6xdTeZcMHRdNaP/WOX1tmolWQVdGHPodZWleLldMsXRW4vr', 'WQvGAZBdGG', 'pqRcK3lcLq', 'ESk6WPVdVSkE', 'WOBcRYldNWSwpWqIWRXNaCod', 'cCkpmNFcQa', 'jb0nW5K', 'tWLQeq', 'aCkTW58', 'aCkNjvRcJq', 'WQ7dUCkDWQhdSa', 'CmkrWRhdG8kTcCoF', 'tSk6W6RdGCoSW7a', 'WObIqX7dR8oNW7ZcTmkHW4K', 'aruUW68c', 'xCk8WRC', 'ECkvWRBdKq', 'c2HzWQu+', 'WOtdPmo/AYhcV8kHeG', 'W7NdTSkzW7FdNG', 'W5BcUCkzW6OM', 'W4NcSmoAWRRdNvlcS0pcI8kaW4mxW7O', 'WQJdQmkwWONdSa', 'dSkaixdcPa', 'aCk3WOlcGhS', '5yQE6zkiva', 'WQpdVrZdU28', 'gCkSW5q', 'yCkBWQPNmq', 'W7lcHCkVW7m', 'Eg3cOG', 'lbmE', 'WOiQW4VcN8kcgCozW4BdTHPBsG', 'ECkjWRySdW', 'W6D2hrW', 'WRnMW6SSyW', '5yMP6zoZqq', 'W6BdGmkXgty'].concat((function () { return ['tmklcNRcNWnb', 'a2JcUSkaWOW', '5P2Q5OIc5yMjWPGLhu18W7xcQNfP77+T5PEb5Rg25l6T5A6fWRpcHCkHWP4poG', 'sb7cPmo6ra', 'WRXFW6W', 'WRpdTmkO', 'WPVdPCkBW7/cJa0', 'jryKWPa3', 'WRH0W6q', 'W7/dQSkUyCov', 'ECkBEblcHcJcOa', 'W7S6yNFcSW', 'WPqiW77cOSoKcW', 'W4BcVmkWW4KB', 'WRjZsHZdRa', 'u8oQdchdKW', 'xL5YW6vqFSkuWQNdPvFcTSkhW6y', 'D8kHW4ZdRSoF', 'w8kpm3Tl', 'AK7dHXZdNW', 'WOJdGSkhW67cHW', 'W4PPWOFdUCo6', 'ExhcOGiSbJ3cHa', '5yQb5P6N5Psm6zsXrYdcNa', 'W4VdOCkBavKc', 'WQ/dM8o3AHG', 'sSkkmfK', 'lLNdPcxcO8oZ', 'WOtdLcFdPuS', '5Q655lUS5yU/', '6i2c5B2c5ywM6lEk5PAr6zsRWPnDWQm', 'WQxdNdldK38', 'W5r1WPZdGmoAsmoNW5C', 'f8kla2BcJJ8', '6i+m5yYY44g0', 'W5/dMSkg', '44cy55MZWQ9sctldPmkf5OUs5yIF', 'WPtdG8kKWRRdHG', 'lCkmxJpcLq3cLa', 'BSkrWRBdLmkTgSoB', 'gmkvWPNcP04CWRGBW6ZdUCkDW69nWQq', 'ExNcTW80', 'WQWpW4v8WQNdICkCW7fpWRZdQCoxW6a', 'WPJcPKW', 'W7FcSupcHZdcOGRdPM3dUG', 'W5NdG8kSW5JdVW', 'Cmk+WQxdQCkT', 'uCkcWOTjma', 'W53dQmkomvG', '5ysE5OQjm8obnINdUaFMJRVKUzRWTAEc', 't8kFW6RdNCo/', 'f8kla0RcKHH+WQq', 'iH49WPWa', 'WOTnW6jYwG', 'WOBdQSoxBcO', 'CLxcJXOU', 'AUkCV8ok', 'xSkKWOeQna', 'DJ3cVSkkW7a', 'W6XWWRFdMmor', '5Q2Q5z+F5OQl6kgX562k', 'WQZdQ8kJWRNdNG', 'WPqiW74', 'tSo4gq', 'WQagW57cRmo8', 'WPTBWR1hpW', 'W4BdHSkTvmo7pSkvaJ/dM2TkWPxcKq', 'WRdMNldMR57OVBVOO7JOJP7LVj3MGONLH4VOTzxML4xPLBNdMSkP', 'gmo8a8oDocxdTa', 'W6X5fc0wDMa', 'yr/cISk4W4K', 'qY3cJrdcRSkihG', 'W6SEw1/cMra', 'o8obW51zbrddQSkNWPS', 'i0lcQCkBWOS', '5Bsb5RIo6zMj5O+W5OUd5P6l6yEF5OUm6zY/5lU8WPldJNRdMmo2W6j3', 'F8kTWOJcLKu', '77YW566A5PUE5AwI5zgz772C4PYx', 'zmkLWPJdS8kf', 'xColW6ZdUXHkW6eNW6BdJ8kfW7js', 'WOjHWOLhpG', 'W5tdP8ksi0CvpSoWcmk5', '6iYO5B6G5yAW6lw15PwU6zAhWOZcHaS', 'WQ/dRSk8WRG', 'WO/dTCoSAt3cP8kyhGHB', 'WPnIWOPCcG', 'CCkBWQxdTCk+ha', '8ywXImof', 'z8kwnCkuaa', 'nXKSWQe3', 'gCo2fW', 'WOtdNGFdVMO', 'Dmk5W4xdT8o7'].concat((function () { return ['uHDwWQtcRv93AGiG', 'iu8+oSo2', 'WPjbW5Cgzq', 'DMZdTaRdMa', 'qIDzdtO', 'ECkYiG', 'W77cRf3cItBcSW', 'ECkcWP9v', 'cNBdNmkkhmkhfWBcRmktBvqI', 'WPRcRwRcLIm', 'xXzIhs8', '7767562v5PUX5AAc5zkt77YO4P+e', 'uW7cG8k6W4OfWQ5TWQdcRq', 'n1/dMsi', 'WRLOW6qwz38nW5S', '6iYR5y2z5PUa56wW5AA56lAf77YB', 'yq7cUSkkW60', 'EHtcUSkNW6u', 'uCkWW7NdOmo/W7zE', 'WOKfW4VcLSom', 'W5JdLSkziHj+W5Lg', 'W5S/W7yTwbO8BmkylCkLxxe', '6k675y6Q5yMjWPG', 'W7BdOmkCW64', 'sSkHW7NdTmoTWRGqW6xcGfmuWQ/dG2FcI3ddH8ozW60SW6fTWRqjkSouW7JcSwZcOYddR1BcT0JdJx58WPNdQCkEWO9JimoMWQ5jW6pdQCk9W4qjW5FdRSk5WRK1WOFdLtPLW6jIFmoLp1aJu8o4W5eQW7S5', 'WPFdPmkJW4lcPW', 'EmkUiG', 'eCoFb8o9aq', 'WR7cJudcMqS', 'tCk0W5/dVSou', '44gK6iYU5y6MW602lCo6c1FcR+AkUUwlHq', 'W7JdJ0hcU0m', '5ysG5OIQWOpcU8kbWRbSW6tMJihKUQtWMPEA', 'WPlcLmoCbSkLySoewLhcKIqE5lUE56w36ls15y+Iq8oMWOBdGCoCyMnbW7/dSrlcK3WMpSkZgHRdL8oPW618uq', 'l8k4WPpcHuNcKmkL', 'tSknWQ7cI3W', 'hbWNWRWv', 'W7TuWRqvW7u', 'W6xcLCkOW48On8oke8ooj0tdVhHsW5hdLdC', 'n0VdMdNcOG', 'W7uquG', 'W5lINi4N', 'bLldJs/cQa', '6i6w5y6O5PIn56sZ5AEW6lsF77Y5', 'f8o+5B+c5Aw755+h6kAO6AcR5BU35zcQ', 'WQpdUWtdM3ldRWNdIvFdR8o+eW', 'W4ddQ8kieeiDdW', 'tX9vWQy', '77+q562L5PQf5AsX5zcF77YO4P6F', 'qSkei1fSW6FcUCk/', '77+R56+e5PQs5AsP5zgO77+F4P6c', 'c8kvW7iJWP0', '5Bsy5RIi6zQR5O6u5OIP5PYN6yw75OIW6zYK5lIjWOTXBGtcKCobcq', 'tGBcGmk4', 'WP54sG', 'W7n9WRJdGmo8', 'ACkXWPKsoa', 'WRNdMbFdGhS', 'yLZdOG', 'a1hcL8kZWP0', 'zeNdPHhdVbjhvrZcJqCcWRNcJbldQmkxWRXbE3xcRmoXWRJcPmo0W4/dN8kuWQa', 'W7PVWPulW40', 'W5ddJM7cOvO', 'W6WBCgJcRG', 'W7PzWPKyW7hcLCoj', 'talcG8k6W5ii', 'hmkvWQBcVa', 'fJ0rWPyO', 'fYy5WOeN', 'W7JcLCkvW48Y', 'huPVWOuu', 'W5L9WOVdImoC', 'W5VcRwdcGIe', 'W5BcHv/cVbG', 'W4FdOXRcLWqDW5qGW5O', 'vKVcKa5d', 'qmk/WRBcSfS', '6i6u5y2D44gU', 'W5jZWQJdU8oh', 'r8oQcJm', 'rsL7WPlcRa', 'W4H/WRhdOmoC', 'BSkeWQ7dMCk4', 'W5PBlL3dVG', 'C8kaWR7cIhG', 'cwX0WQSuWOGhqa', 'W7ldT8kGfY4', '5yQP5P2G5PEd6zweW5zhCG', 'BYLulri', 'A8kqAbpcGZxcR0Xm', '44c95PQs5PA+nZtdTCkybhdcG+AkTUwlMq', 'WOzIWQG']; }())); }())); }()); _0x53ff = function () { return _0x4dbf40; }; return _0x53ff(); }; function Task(_0x3e5a3d, _0x422a9d = 0x0) { const _0x1c079d = _0x5a6816, _0x3b4449 = { 'cQyMa': function (_0x16af88, _0x440a9c) { return _0x16af88(_0x440a9c); }, 'mMWHV': function (_0x442311, _0x225b92) { return _0x442311 + _0x225b92; }, 'pELRv': function (_0x2dabc0, _0x2ea796) { return _0x2dabc0 + _0x2ea796; }, 'QtZUr': _0x1c079d(0x11a, 'aOBr'), 'oxAeD': function (_0x473256, _0x5d03bb) { return _0x473256(_0x5d03bb); }, 'ZsWzC': function (_0x1cc2fb, _0x31615f) { return _0x1cc2fb(_0x31615f); }, 'EVkjW': _0x1c079d(0x111, ')ivc'), 'oRXmB': function (_0xb217e8, _0x393f43) { return _0xb217e8 == _0x393f43; }, 'ELYXw': function (_0x337ec6, _0x226698) { return _0x337ec6 !== _0x226698; }, 'cPFHi': function (_0x6c41bb, _0x583337) { return _0x6c41bb + _0x583337; }, 'InswB': function (_0x3eb95f, _0x370ccb) { return _0x3eb95f === _0x370ccb; }, 'dqske': _0x1c079d(0x167, '4PeQ'), 'dcIYm': _0x1c079d(0xc7, '%Bo9'), 'hxiOe': _0x1c079d(0x183, '5W^u'), 'tnjYl': '八成Cookie掉了🆘', 'hFHwo': '未知错误', 'tBhgj': function (_0x589056, _0x806c76) { return _0x589056 === _0x806c76; }, 'gKJql': _0x1c079d(0xb2, 'qOFG'), 'RUIFt': function (_0x581989, _0x144273, _0x3a28ae) { return _0x581989(_0x144273, _0x3a28ae); } }; return new Promise(_0x44197a => { const _0x25785b = _0x1c079d; if (_0x3b4449[_0x25785b(0x18e, 'IV%4')](_0x3b4449[_0x25785b(0xf6, 'I03t')], _0x3b4449[_0x25785b(0x9d, 'gLXf')])) _0x3b4449['RUIFt'](setTimeout, () => { const _0x444735 = _0x25785b, _0xa2fb95 = { 'hlFZW': function (_0x560695, _0x2cbfb8) { const _0x2a7712 = _0x719e; return _0x3b4449[_0x2a7712(0x101, 'Cl^W')](_0x560695, _0x2cbfb8); }, 'eXhGU': function (_0x145862, _0x582b6d) { const _0x588055 = _0x719e; return _0x3b4449[_0x588055(0x16c, 'eHu!')](_0x145862, _0x582b6d); }, 'yQZCI': function (_0x1c2c30, _0x2d2596) { return _0x1c2c30 + _0x2d2596; }, 'owQaJ': function (_0x5e3146, _0xae5c09) { return _0x3b4449['pELRv'](_0x5e3146, _0xae5c09); }, 'DLlRZ': function (_0x3db089, _0x357b3d) { return _0x3db089 + _0x357b3d; }, 'IdSlc': _0x444735(0xec, 'GaoH'), 'Zaijb': _0x444735(0xb8, 'Vq&Z'), 'mJgYa': _0x444735(0x16d, 'Aquz'), 'dWCQm': _0x3b4449['QtZUr'], 'puxRN': function (_0x390977, _0x475a02) { const _0x22ac7f = _0x444735; return _0x3b4449[_0x22ac7f(0xcc, 'KSBU')](_0x390977, _0x475a02); }, 'TIEqg': function (_0x234371, _0x21dd6f) { return _0x3b4449['mMWHV'](_0x234371, _0x21dd6f); }, 'COZYI': function (_0x31db77, _0x3d7610) { const _0x3db993 = _0x444735; return _0x3b4449[_0x3db993(0xd4, 'tznY')](_0x31db77, _0x3d7610); }, 'WYMCy': _0x3b4449[_0x444735(0x193, '$@!f')], 'HRzTb': function (_0x5d3d37, _0x1323c5) { return _0x3b4449['oRXmB'](_0x5d3d37, _0x1323c5); }, 'UtAjA': function (_0x59bd4b, _0x414d91) { const _0x4ac295 = _0x444735; return _0x3b4449[_0x4ac295(0x93, '4PeQ')](_0x59bd4b, _0x414d91); }, 'mWPcj': function (_0x315051, _0xddc13) { return _0x3b4449['cPFHi'](_0x315051, _0xddc13); }, 'lcFGy': function (_0x302376, _0x4d7784) { const _0x39a19f = _0x444735; return _0x3b4449[_0x39a19f(0xc1, '%upr')](_0x302376, _0x4d7784); }, 'BLpFi': _0x3b4449[_0x444735(0x12d, 'GWen')], 'tSdqF': _0x3b4449[_0x444735(0xe8, 'Vq&Z')], 'ZkezT': _0x444735(0xf3, 'FWSE'), 'EGbIF': _0x3b4449[_0x444735(0xb0, 'VTVG')], 'qdxSK': function (_0x29ca08, _0x2d6c1c) { const _0xd4cf19 = _0x444735; return _0x3b4449[_0xd4cf19(0x14f, 'Cl^W')](_0x29ca08, _0x2d6c1c); }, 'KPVWx': _0x3b4449['tnjYl'], 'zeITs': _0x3b4449['hFHwo'] }; let _0x310986 = { 'url': _0x444735(0x154, 'FWSE'), 'headers': { 'Content-Type': _0x444735(0xff, 's!&*') }, 'body': JSON['stringify']({ 'loginUid': _0x3e5a3d, 'status': 0x1 }) }; $[_0x444735(0x105, 'eHu!')](_0x310986, async (_0x1e19bf, _0x221dd9, _0x8c3b45) => { const _0x3865bc = _0x444735; if (_0xa2fb95[_0x3865bc(0x132, 'Vq&Z')] === _0xa2fb95[_0x3865bc(0x128, 'a9AK')]) try { _0x8c3b45 = JSON[_0x3865bc(0x13d, '$@!f')](_0x8c3b45); if (_0xa2fb95[_0x3865bc(0x17b, 'VTVG')](_0x8c3b45['code'], 0xc8)) { if (_0xa2fb95['UtAjA'](_0x3865bc(0xfc, '%upr'), 'thcIS')) _0x26b250[_0x40595b] = _0x20033f; else { let _0x5a1cd4 = _0x8c3b45[_0x3865bc(0x14b, 'GaoH')][_0x3865bc(0x103, 'Vq&Z')], _0x3117a5 = new Date(_0xa2fb95[_0x3865bc(0x170, ']vxk')](Number, _0x5a1cd4)), _0x29bc44 = _0x3117a5[_0x3865bc(0x13a, 's!&*')](); $[_0x3865bc(0x163, '^*zT')](_0xa2fb95['DLlRZ'](_0xa2fb95[_0x3865bc(0x13f, 'm]wh')](_0xa2fb95[_0x3865bc(0x147, 'r7Dq')](_0xa2fb95[_0x3865bc(0x100, 'Vq&Z')](_0xa2fb95['owQaJ'](_0x8c3b45[_0x3865bc(0x148, '%upr')], _0xa2fb95[_0x3865bc(0x10b, 'jXnh')]), _0xa2fb95[_0x3865bc(0x133, '4PeQ')]), _0x8c3b45['data']['singleTime']), _0xa2fb95[_0x3865bc(0x98, 'j*@O')]) + _0xa2fb95[_0x3865bc(0x113, 'zzf*')], _0x29bc44)), _0xa2fb95[_0x3865bc(0x11b, '%Bo9')](_0x44197a, { 'success': !![], 'singleTime': _0xa2fb95[_0x3865bc(0x18f, ')ivc')](parseFloat, _0x8c3b45[_0x3865bc(0x146, '2tNu')][_0x3865bc(0x139, 'f[IS')]), 'expiryTime': _0x29bc44, 'message': _0xa2fb95[_0x3865bc(0x18d, 's!&*')](_0x8c3b45[_0x3865bc(0x172, 'gLXf')], '!✅') }); } } else { if (_0xa2fb95[_0x3865bc(0x12e, '1gsg')](_0x8c3b45['code'], -0x1)) { if (_0xa2fb95[_0x3865bc(0x116, 'Aquz')] === _0xa2fb95['tSdqF']) { let _0x5c6205 = _0x327309[_0x3865bc(0x164, 'a9AK')][_0x3865bc(0xab, 'f[IS')], _0x15589a = new _0x221541(_0xa2fb95[_0x3865bc(0x170, ']vxk')](_0x58c3f5, _0x5c6205)), _0x212524 = _0x15589a[_0x3865bc(0xa8, '5W^u')](); _0x206fd1['log'](_0xa2fb95[_0x3865bc(0x147, 'r7Dq')](_0xa2fb95['eXhGU'](_0xa2fb95[_0x3865bc(0x106, 'v9T8')](_0xa2fb95[_0x3865bc(0xb4, 'a9AK')](_0xa2fb95[_0x3865bc(0x9f, '^*zT')](_0xa2fb95[_0x3865bc(0x187, ']xp]')](_0x21e507[_0x3865bc(0x17e, 'FWSE')], _0xa2fb95[_0x3865bc(0x82, '%upr')]), _0xa2fb95[_0x3865bc(0x9b, 'FWSE')]), _0x2f3748['data'][_0x3865bc(0x161, 'GaoH')]), _0xa2fb95[_0x3865bc(0x94, 'a9AK')]), _0xa2fb95[_0x3865bc(0x142, 'Aquz')]), _0x212524)), _0xa2fb95[_0x3865bc(0xb6, 'r7Dq')](_0x378227, { 'success': !![], 'singleTime': _0xa2fb95[_0x3865bc(0x156, 'QpP%')](_0x3279e7, _0x5b2d6f[_0x3865bc(0x112, 'm]wh')]['singleTime']), 'expiryTime': _0x212524, 'message': _0xa2fb95[_0x3865bc(0x168, ']xp]')](_0x3c9de8[_0x3865bc(0xa5, 'm]wh')], '!✅') }); } else $['log'](_0xa2fb95['mWPcj'](_0x8c3b45['msg'], _0xa2fb95[_0x3865bc(0x13e, 'Q*aQ')])), _0xa2fb95['hlFZW'](_0x44197a, { 'success': ![], 'singleTime': 0x0, 'expiryTime': '', 'message': _0xa2fb95['mWPcj'](_0x8c3b45['msg'], _0x3865bc(0xb3, '^*zT')) }); } else { if (_0xa2fb95[_0x3865bc(0x18b, 'j*@O')](_0xa2fb95['EGbIF'], _0xa2fb95[_0x3865bc(0x13b, '%upr')])) try { if (_0x5ea5d3) { _0x47e458['logErr']('获取昵称失败：' + _0xc708e3), _0x376189(''); return; } _0x398ff5 = _0x249826['parse'](_0x8d6dc5); const _0x2a98ad = _0x29d1c3['data'][_0x3865bc(0x120, 'QpP%')]; _0xa2fb95['COZYI'](_0x5c5ba9, _0x2a98ad); } catch (_0x390289) { _0x47d507['logErr'](_0x390289), _0xa2fb95['hlFZW'](_0x3547cb, ''); } else $[_0x3865bc(0x134, 'kEiQ')](_0xa2fb95['qdxSK'](_0x8c3b45['msg'], _0xa2fb95[_0x3865bc(0xe2, 'Cl^W')])), _0x44197a({ 'success': ![], 'singleTime': 0x0, 'expiryTime': '', 'message': _0xa2fb95[_0x3865bc(0x10c, 'jXnh')](_0x8c3b45[_0x3865bc(0x172, 'gLXf')], _0x3865bc(0x97, 'Q*aQ')) }); } } } catch (_0x33ce8a) { $[_0x3865bc(0x186, 'oPVz')](_0x33ce8a), _0xa2fb95[_0x3865bc(0x85, '%upr')](_0x44197a, { 'success': ![], 'singleTime': 0x0, 'expiryTime': '', 'message': _0xa2fb95[_0x3865bc(0x108, ']xp]')] }); } else _0x18224b[_0x3865bc(0x160, 'j*@O')](_0xacb99c), _0xa2fb95[_0x3865bc(0x119, 'kEiQ')](_0x3cded6, ''); }); }, _0x422a9d); else { const [_0x1301ec, _0x126aba] = _0x39e4b4[_0x25785b(0x115, 'a9AK')]('='); _0x3b4449[_0x25785b(0xc1, '%upr')](_0x1301ec, 'loginUid') && (_0x4c2b89 = _0x126aba); } }); } async function showmsg() { const _0x246351 = _0x5a6816, _0x5662c4 = { 'rcNKh': function (_0x1e4292, _0x166b71) { return _0x1e4292 + _0x166b71; }, 'fppaz': _0x246351(0x12f, 'Cl^W'), 'oaRzJ': _0x246351(0xd1, ']@h*'), 'qiETq': function (_0xb7b88e, _0x1c46e3) { return _0xb7b88e !== _0x1c46e3; }, 'JVNCH': 'PfIRk', 'zOxEn': 'fJKJj', 'rkVTT': 'naIkd' }; if (tz == 0x1) { if (_0x5662c4['qiETq'](_0x5662c4[_0x246351(0x141, 'I[UL')], _0x5662c4[_0x246351(0x109, 'iM!b')])) $[_0x246351(0x195, 'DBiC')]() ? _0x5662c4['rkVTT'] !== _0x5662c4[_0x246351(0x159, '2tNu')] ? _0x309379[_0x246351(0xb9, 'GWen')]('用户' + _0x5662c4[_0x246351(0x114, ')ivc')](_0x14216c, 0x1)) : await notify['sendNotify']($[_0x246351(0xf8, 'tznY')], message) : $['msg']($['name'], '', message); else { const _0x2bcc9e = _0x5662c4['fppaz'][_0x246351(0xcd, '%Bo9')]('|'); let _0xd4520c = 0x0; while (!![]) { switch (_0x2bcc9e[_0xd4520c++]) { case '0': _0x338f5f[_0x246351(0xad, 'g61A')](_0x19cd9f[_0x246351(0xda, '4PeQ')]('&'), _0x5662c4[_0x246351(0xe0, 'j*@O')]); continue; case '1': _0x44894a[_0x246351(0x173, 'zxh)')](_0x246351(0x88, '2tNu') + _0x5f0d10 + _0x246351(0x8a, ']vxk')); continue; case '2': _0x187a96['setdata'](_0x4966ea, _0x246351(0x166, '$@!f') + _0x5ee259); continue; case '3': _0x41c0f0[_0x246351(0x182, ']@h*')](_0x5dfe64[_0x246351(0x176, 'f[IS')], '', '【' + _0xc47e9c + _0x246351(0x130, ']@h*')); continue; case '4': _0x4d2ef6[_0x246351(0xca, ']vxk')](_0x107bd3); continue; }break; } } } else console[_0x246351(0x150, 'gLXf')](message); } var version_ = 'jsjiami.com.v7';

// https://github.com/chavyleung/scripts/blob/master/Env.min.js
/*********************************** API *************************************/
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = 'GET') {
      t = 'string' == typeof t ? { url: t } : t;
      let s = this.get;
      return (
        'POST' === e && (s = this.post),
        new Promise((e, a) => {
          s.call(this, t, (t, s, r) => {
            t ? a(t) : e(s);
          });
        })
      );
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, 'POST');
    }
  }
  return new (class {
    constructor(t, e) {
      (this.name = t),
        (this.http = new s(this)),
        (this.data = null),
        (this.dataFile = 'box.dat'),
        (this.logs = []),
        (this.isMute = !1),
        (this.isNeedRewrite = !1),
        (this.logSeparator = '\n'),
        (this.encoding = 'utf-8'),
        (this.startTime = new Date().getTime()),
        Object.assign(this, e),
        this.log('', `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return 'undefined' != typeof $environment && $environment['surge-version']
        ? 'Surge'
        : 'undefined' != typeof $environment && $environment['stash-version']
          ? 'Stash'
          : 'undefined' != typeof module && module.exports
            ? 'Node.js'
            : 'undefined' != typeof $task
              ? 'Quantumult X'
              : 'undefined' != typeof $loon
                ? 'Loon'
                : 'undefined' != typeof $rocket
                  ? 'Shadowrocket'
                  : void 0;
    }
    isNode() {
      return 'Node.js' === this.getEnv();
    }
    isQuanX() {
      return 'Quantumult X' === this.getEnv();
    }
    isSurge() {
      return 'Surge' === this.getEnv();
    }
    isLoon() {
      return 'Loon' === this.getEnv();
    }
    isShadowrocket() {
      return 'Shadowrocket' === this.getEnv();
    }
    isStash() {
      return 'Stash' === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const a = this.getdata(t);
      if (a)
        try {
          s = JSON.parse(this.getdata(t));
        } catch { }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise((e) => {
        this.get({ url: t }, (t, s, a) => e(a));
      });
    }
    runScript(t, e) {
      return new Promise((s) => {
        let a = this.getdata('@chavy_boxjs_userCfgs.httpapi');
        a = a ? a.replace(/\n/g, '').trim() : a;
        let r = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout');
        (r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r);
        const [i, o] = a.split('@'),
          n = {
            url: `http://${o}/v1/scripting/evaluate`,
            body: { script_text: t, mock_type: 'cron', timeout: r },
            headers: { 'X-Key': i, Accept: '*/*' },
            timeout: r,
          };
        this.post(n, (t, e, a) => s(a));
      }).catch((t) => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        (this.fs = this.fs ? this.fs : require('fs')),
          (this.path = this.path ? this.path : require('path'));
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          a = !s && this.fs.existsSync(e);
        if (!s && !a) return {};
        {
          const a = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(a));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        (this.fs = this.fs ? this.fs : require('fs')),
          (this.path = this.path ? this.path : require('path'));
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          a = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s
          ? this.fs.writeFileSync(t, r)
          : a
            ? this.fs.writeFileSync(e, r)
            : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const a = e.replace(/\[(\d+)\]/g, '.$1').split('.');
      let r = t;
      for (const t of a) if (((r = Object(r)[t]), void 0 === r)) return s;
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t
        ? t
        : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
          (e
            .slice(0, -1)
            .reduce(
              (t, s, a) =>
                Object(t[s]) === t[s]
                  ? t[s]
                  : (t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}),
              t
            )[e[e.length - 1]] = s),
          t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : '';
        if (r)
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, a, '') : e;
          } catch (t) {
            e = '';
          }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e),
          i = this.getval(a),
          o = a ? ('null' === i ? null : i || '{}') : '{}';
        try {
          const e = JSON.parse(o);
          this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), a));
        } catch (e) {
          const i = {};
          this.lodash_set(i, r, t), (s = this.setval(JSON.stringify(i), a));
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
          return $persistentStore.read(t);
        case 'Quantumult X':
          return $prefs.valueForKey(t);
        case 'Node.js':
          return (this.data = this.loaddata()), this.data[t];
        default:
          return (this.data && this.data[t]) || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
          return $persistentStore.write(t, e);
        case 'Quantumult X':
          return $prefs.setValueForKey(t, e);
        case 'Node.js':
          return (
            (this.data = this.loaddata()),
            (this.data[e] = t),
            this.writedata(),
            !0
          );
        default:
          return (this.data && this.data[e]) || null;
      }
    }
    initGotEnv(t) {
      (this.got = this.got ? this.got : require('got')),
        (this.cktough = this.cktough ? this.cktough : require('tough-cookie')),
        (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
        t &&
        ((t.headers = t.headers ? t.headers : {}),
          void 0 === t.headers.Cookie &&
          void 0 === t.cookieJar &&
          (t.cookieJar = this.ckjar));
    }
    get(t, e = () => { }) {
      switch (
      (t.headers &&
        (delete t.headers['Content-Type'],
          delete t.headers['Content-Length'],
          delete t.headers['content-type'],
          delete t.headers['content-length']),
        t.params && (t.url += '?' + this.queryStr(t.params)),
        this.getEnv())
      ) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
        default:
          this.isSurge() &&
            this.isNeedRewrite &&
            ((t.headers = t.headers || {}),
              Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
            $httpClient.get(t, (t, s, a) => {
              !t &&
                s &&
                ((s.body = a),
                  (s.statusCode = s.status ? s.status : s.statusCode),
                  (s.status = s.statusCode)),
                e(t, s, a);
            });
          break;
        case 'Quantumult X':
          this.isNeedRewrite &&
            ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              (t) => {
                const {
                  statusCode: s,
                  statusCode: a,
                  headers: r,
                  body: i,
                  bodyBytes: o,
                } = t;
                e(
                  null,
                  {
                    status: s,
                    statusCode: a,
                    headers: r,
                    body: i,
                    bodyBytes: o,
                  },
                  i,
                  o
                );
              },
              (t) => e((t && t.error) || 'UndefinedError')
            );
          break;
        case 'Node.js':
          let s = require('iconv-lite');
          this.initGotEnv(t),
            this.got(t)
              .on('redirect', (t, e) => {
                try {
                  if (t.headers['set-cookie']) {
                    const s = t.headers['set-cookie']
                      .map(this.cktough.Cookie.parse)
                      .toString();
                    s && this.ckjar.setCookieSync(s, null),
                      (e.cookieJar = this.ckjar);
                  }
                } catch (t) {
                  this.logErr(t);
                }
              })
              .then(
                (t) => {
                  const {
                    statusCode: a,
                    statusCode: r,
                    headers: i,
                    rawBody: o,
                  } = t,
                    n = s.decode(o, this.encoding);
                  e(
                    null,
                    {
                      status: a,
                      statusCode: r,
                      headers: i,
                      rawBody: o,
                      body: n,
                    },
                    n
                  );
                },
                (t) => {
                  const { message: a, response: r } = t;
                  e(a, r, r && s.decode(r.rawBody, this.encoding));
                }
              );
      }
    }
    post(t, e = () => { }) {
      const s = t.method ? t.method.toLocaleLowerCase() : 'post';
      switch (
      (t.body &&
        t.headers &&
        !t.headers['Content-Type'] &&
        !t.headers['content-type'] &&
        (t.headers['content-type'] = 'application/x-www-form-urlencoded'),
        t.headers &&
        (delete t.headers['Content-Length'],
          delete t.headers['content-length']),
        this.getEnv())
      ) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
        default:
          this.isSurge() &&
            this.isNeedRewrite &&
            ((t.headers = t.headers || {}),
              Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
            $httpClient[s](t, (t, s, a) => {
              !t &&
                s &&
                ((s.body = a),
                  (s.statusCode = s.status ? s.status : s.statusCode),
                  (s.status = s.statusCode)),
                e(t, s, a);
            });
          break;
        case 'Quantumult X':
          (t.method = s),
            this.isNeedRewrite &&
            ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              (t) => {
                const {
                  statusCode: s,
                  statusCode: a,
                  headers: r,
                  body: i,
                  bodyBytes: o,
                } = t;
                e(
                  null,
                  {
                    status: s,
                    statusCode: a,
                    headers: r,
                    body: i,
                    bodyBytes: o,
                  },
                  i,
                  o
                );
              },
              (t) => e((t && t.error) || 'UndefinedError')
            );
          break;
        case 'Node.js':
          let a = require('iconv-lite');
          this.initGotEnv(t);
          const { url: r, ...i } = t;
          this.got[s](r, i).then(
            (t) => {
              const {
                statusCode: s,
                statusCode: r,
                headers: i,
                rawBody: o,
              } = t,
                n = a.decode(o, this.encoding);
              e(
                null,
                { status: s, statusCode: r, headers: i, rawBody: o, body: n },
                n
              );
            },
            (t) => {
              const { message: s, response: r } = t;
              e(s, r, r && a.decode(r.rawBody, this.encoding));
            }
          );
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let a = {
        'M+': s.getMonth() + 1,
        'd+': s.getDate(),
        'H+': s.getHours(),
        'm+': s.getMinutes(),
        's+': s.getSeconds(),
        'q+': Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds(),
      };
      /(y+)/.test(t) &&
        (t = t.replace(
          RegExp.$1,
          (s.getFullYear() + '').substr(4 - RegExp.$1.length)
        ));
      for (let e in a)
        new RegExp('(' + e + ')').test(t) &&
          (t = t.replace(
            RegExp.$1,
            1 == RegExp.$1.length
              ? a[e]
              : ('00' + a[e]).substr(('' + a[e]).length)
          ));
      return t;
    }
    queryStr(t) {
      let e = '';
      for (const s in t) {
        let a = t[s];
        null != a &&
          '' !== a &&
          ('object' == typeof a && (a = JSON.stringify(a)),
            (e += `${s}=${a}&`));
      }
      return (e = e.substring(0, e.length - 1)), e;
    }
    msg(e = t, s = '', a = '', r) {
      const i = (t) => {
        switch (typeof t) {
          case void 0:
            return t;
          case 'string':
            switch (this.getEnv()) {
              case 'Surge':
              case 'Stash':
              default:
                return { url: t };
              case 'Loon':
              case 'Shadowrocket':
                return t;
              case 'Quantumult X':
                return { 'open-url': t };
              case 'Node.js':
                return;
            }
          case 'object':
            switch (this.getEnv()) {
              case 'Surge':
              case 'Stash':
              case 'Shadowrocket':
              default: {
                let e = t.url || t.openUrl || t['open-url'];
                return { url: e };
              }
              case 'Loon': {
                let e = t.openUrl || t.url || t['open-url'],
                  s = t.mediaUrl || t['media-url'];
                return { openUrl: e, mediaUrl: s };
              }
              case 'Quantumult X': {
                let e = t['open-url'] || t.url || t.openUrl,
                  s = t['media-url'] || t.mediaUrl,
                  a = t['update-pasteboard'] || t.updatePasteboard;
                return {
                  'open-url': e,
                  'media-url': s,
                  'update-pasteboard': a,
                };
              }
              case 'Node.js':
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute)
        switch (this.getEnv()) {
          case 'Surge':
          case 'Loon':
          case 'Stash':
          case 'Shadowrocket':
          default:
            $notification.post(e, s, a, i(r));
            break;
          case 'Quantumult X':
            $notify(e, s, a, i(r));
            break;
          case 'Node.js':
        }
      if (!this.isMuteLog) {
        let t = ['', '==============📣系统通知📣=============='];
        t.push(e),
          s && t.push(s),
          a && t.push(a),
          console.log(t.join('\n')),
          (this.logs = this.logs.concat(t));
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
        case 'Quantumult X':
        default:
          this.log('', `❗️${this.name}, 错误!`, t);
          break;
        case 'Node.js':
          this.log('', `❗️${this.name}, 错误!`, t.stack);
      }
    }
    wait(t) {
      return new Promise((e) => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1e3;
      switch (
      (this.log('', `🔔${this.name}, 结束! 🕛 ${s} 秒`),
        this.log(),
        this.getEnv())
      ) {
        case 'Surge':
        case 'Loon':
        case 'Stash':
        case 'Shadowrocket':
        case 'Quantumult X':
        default:
          $done(t);
          break;
        case 'Node.js':
          process.exit(1);
      }
    }
  })(t, e);
}
/*****************************************************************************/
