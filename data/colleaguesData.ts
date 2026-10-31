import type { PersonProfile } from './scholarsData'

export type ColleagueId =
  | 'shuning-dong'
  | 'tianran-chen'
  | 'rui-chen'
  | 'shulei-he'
  | 'zhicheng-yang'

// Names, study programmes, photographs and links from draft.key, slides 6–10.
// Email targets are normalized from Keynote’s http:// links to mailto:.
const colleaguesData: Record<ColleagueId, PersonProfile> = {
  'shuning-dong': {
    id: 'shuning-dong',
    name: 'Shuning Dong',
    chineseName: '董书宁',
    nickname: 'Doris',
    title: 'Undergrad, Biological Sciences',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['ShuningDD@outlook.com'],
    links: [
      {
        label: 'Email',
        href: 'mailto:ShuningDD@outlook.com',
      },
    ],
    card: {
      background: '#161916',
      foreground: '#ffffff',
      institution: 'Xi’an Jiaotong-Liverpool University',
      layout: 'photo',
    },
    photo: {
      src: '/static/images/people/shuning-dong.webp',
      alt: 'Portrait of Shuning Dong',
      width: 2316,
      height: 1536,
    },
  },
  'tianran-chen': {
    id: 'tianran-chen',
    name: 'Tianran Chen',
    chineseName: '陈天然（AKA 陈满仓）',
    title: 'Undergrad, Biopharmaceuticals',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['13861828957@163.com'],
    links: [
      {
        label: 'Email',
        href: 'mailto:13861828957@163.com',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/hidd_lospants',
      },
    ],
    card: {
      background: '#161916',
      foreground: '#ffffff',
      institution: 'Xi’an Jiaotong-Liverpool University',
      layout: 'photo',
    },
    photo: {
      src: '/static/images/people/tianran-chen.webp',
      alt: 'Portrait of Tianran Chen',
      width: 1706,
      height: 1279,
    },
  },
  'rui-chen': {
    id: 'rui-chen',
    name: 'Rui Chen',
    chineseName: '陈睿',
    title: 'Undergrad, Biomedical Sciences',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['chenrui.abroad@gmail.com'],
    links: [
      {
        label: 'Email',
        href: 'mailto:chenrui.abroad@gmail.com',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/opiniatre128?utm_source=qr&xtok=MTA0eTdpYW1hNzV5dQ==',
      },
    ],
    card: {
      background: '#161916',
      foreground: '#ffffff',
      institution: 'Xi’an Jiaotong-Liverpool University',
      layout: 'photo',
    },
    photo: {
      src: '/static/images/people/rui-chen.webp',
      alt: 'Portrait of Rui Chen',
      width: 2316,
      height: 1536,
    },
  },
  'shulei-he': {
    id: 'shulei-he',
    name: 'Shulei He',
    chineseName: '何舒磊',
    title: 'Undergrad, Biological Sciences',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['13861828957@163.com'],
    links: [
      {
        label: 'Email',
        href: 'mailto:13861828957@163.com',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/tsutayah/',
      },
      {
        label: 'ORCID',
        href: 'https://orcid.org/0009-0002-6830-189X',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/Tsutayaaa',
      },
    ],
    card: {
      background: '#161916',
      foreground: '#ffffff',
      institution: 'Xi’an Jiaotong-Liverpool University',
      layout: 'photo',
    },
    photo: {
      src: '/static/images/people/shulei-he.webp',
      alt: 'Portrait of Shulei He',
      width: 2560,
      height: 1698,
    },
  },
  'zhicheng-yang': {
    id: 'zhicheng-yang',
    name: 'Zhicheng Yang',
    chineseName: '杨智城',
    nickname: 'Colin',
    title: 'Undergrad, Bioinformatics',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['colin.zhicheng.yang@gmail.com'],
    links: [
      {
        label: 'Email',
        href: 'mailto:colin.zhicheng.yang@gmail.com',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/c0linyang?dlrf=OW4ybmM5NDhpY2k1&utm_source=qr',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/colinzyang',
      },
    ],
    card: {
      background: '#161916',
      foreground: '#ffffff',
      institution: 'Xi’an Jiaotong-Liverpool University',
      layout: 'photo',
    },
    photo: {
      src: '/static/images/people/zhicheng-yang.webp',
      alt: 'Portrait of Zhicheng Yang',
      width: 1531,
      height: 2310,
    },
  },
}

export default colleaguesData
