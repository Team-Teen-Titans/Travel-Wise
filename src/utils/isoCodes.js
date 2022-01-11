const isoCodes = [
  {
    'Country': 'Afghanistan',
    'ThreeLetterSymbol': 'afg'
  },
  {
    'Country': 'Albania',
    'ThreeLetterSymbol': 'alb'
  },
  {
    'Country': 'Algeria',
    'ThreeLetterSymbol': 'dza'
  },
  {
    'Country': 'Andorra',
    'ThreeLetterSymbol': 'and'
  },
  {
    'Country': 'Angola',
    'ThreeLetterSymbol': 'ago'
  },
  {
    'Country': 'Anguilla',
    'ThreeLetterSymbol': 'aia'
  },
  {
    'Country': 'Antigua and Barbuda',
    'ThreeLetterSymbol': 'atg'
  },
  {
    'Country': 'Argentina',
    'ThreeLetterSymbol': 'arg'
  },
  {
    'Country': 'Armenia',
    'ThreeLetterSymbol': 'arm'
  },
  {
    'Country': 'Aruba',
    'ThreeLetterSymbol': 'abw'
  },
  {
    'Country': 'Australia',
    'ThreeLetterSymbol': 'aus'
  },
  {
    'Country': 'Austria',
    'ThreeLetterSymbol': 'aut'
  },
  {
    'Country': 'Azerbaijan',
    'ThreeLetterSymbol': 'aze'
  },
  {
    'Country': 'Bahamas',
    'ThreeLetterSymbol': 'bhs'
  },
  {
    'Country': 'Bahrain',
    'ThreeLetterSymbol': 'bhr'
  },
  {
    'Country': 'Bangladesh',
    'ThreeLetterSymbol': 'bgd'
  },
  {
    'Country': 'Barbados',
    'ThreeLetterSymbol': 'brb'
  },
  {
    'Country': 'Belarus',
    'ThreeLetterSymbol': 'blr'
  },
  {
    'Country': 'Belgium',
    'ThreeLetterSymbol': 'bel'
  },
  {
    'Country': 'Belize',
    'ThreeLetterSymbol': 'blz'
  },
  {
    'Country': 'Benin',
    'ThreeLetterSymbol': 'ben'
  },
  {
    'Country': 'Bermuda',
    'ThreeLetterSymbol': 'bmu'
  },
  {
    'Country': 'Bhutan',
    'ThreeLetterSymbol': 'btn'
  },
  {
    'Country': 'Bolivia',
    'ThreeLetterSymbol': 'bol'
  },
  {
    'Country': 'Bosnia and Herzegovina',
    'ThreeLetterSymbol': 'bih'
  },
  {
    'Country': 'Botswana',
    'ThreeLetterSymbol': 'bwa'
  },
  {
    'Country': 'Brazil',
    'ThreeLetterSymbol': 'bra'
  },
  {
    'Country': 'British Virgin Islands',
    'ThreeLetterSymbol': 'vgb'
  },
  {
    'Country': 'Brunei',
    'ThreeLetterSymbol': 'brn'
  },
  {
    'Country': 'Bulgaria',
    'ThreeLetterSymbol': 'bgr'
  },
  {
    'Country': 'Burkina Faso',
    'ThreeLetterSymbol': 'bfa'
  },
  {
    'Country': 'Burundi',
    'ThreeLetterSymbol': 'bdi'
  },
  {
    'Country': 'CAR',
    'ThreeLetterSymbol': 'caf'
  },
  {
    'Country': 'Cabo Verde',
    'ThreeLetterSymbol': 'cpv'
  },
  {
    'Country': 'Cambodia',
    'ThreeLetterSymbol': 'khm'
  },
  {
    'Country': 'Cameroon',
    'ThreeLetterSymbol': 'cmr'
  },
  {
    'Country': 'Canada',
    'ThreeLetterSymbol': 'can'
  },
  {
    'Country': 'Caribbean Netherlands',
    'ThreeLetterSymbol': 'bes'
  },
  {
    'Country': 'Cayman Islands',
    'ThreeLetterSymbol': 'cym'
  },
  {
    'Country': 'Chad',
    'ThreeLetterSymbol': 'tcd'
  },
  {
    'Country': 'Channel Islands',
    'ThreeLetterSymbol': 'usa'
  },
  {
    'Country': 'Chile',
    'ThreeLetterSymbol': 'chl'
  },
  {
    'Country': 'China',
    'ThreeLetterSymbol': 'chn'
  },
  {
    'Country': 'Colombia',
    'ThreeLetterSymbol': 'col'
  },
  {
    'Country': 'Comoros',
    'ThreeLetterSymbol': 'com'
  },
  {
    'Country': 'Congo',
    'ThreeLetterSymbol': 'cog'
  },
  {
    'Country': 'Costa Rica',
    'ThreeLetterSymbol': 'cri'
  },
  {
    'Country': 'Croatia',
    'ThreeLetterSymbol': 'hrv'
  },
  {
    'Country': 'Cuba',
    'ThreeLetterSymbol': 'cub'
  },
  {
    'Country': 'Curaçao',
    'ThreeLetterSymbol': 'cuw'
  },
  {
    'Country': 'Cyprus',
    'ThreeLetterSymbol': 'cyp'
  },
  {
    'Country': 'Czechia',
    'ThreeLetterSymbol': 'cze'
  },
  {
    'Country': 'DRC',
    'ThreeLetterSymbol': 'cod'
  },
  {
    'Country': 'Denmark',
    'ThreeLetterSymbol': 'dnk'
  },
  {
    'Country': 'Diamond Princess',
    'ThreeLetterSymbol': 'usa'
  },
  {
    'Country': 'Djibouti',
    'ThreeLetterSymbol': 'dji'
  },
  {
    'Country': 'Dominica',
    'ThreeLetterSymbol': 'dma'
  },
  {
    'Country': 'Dominican Republic',
    'ThreeLetterSymbol': 'dom'
  },
  {
    'Country': 'Ecuador',
    'ThreeLetterSymbol': 'ecu'
  },
  {
    'Country': 'Egypt',
    'ThreeLetterSymbol': 'egy'
  },
  {
    'Country': 'El Salvador',
    'ThreeLetterSymbol': 'slv'
  },
  {
    'Country': 'Equatorial Guinea',
    'ThreeLetterSymbol': 'gnq'
  },
  {
    'Country': 'Eritrea',
    'ThreeLetterSymbol': 'eri'
  },
  {
    'Country': 'Estonia',
    'ThreeLetterSymbol': 'est'
  },
  {
    'Country': 'Eswatini',
    'ThreeLetterSymbol': 'swz'
  },
  {
    'Country': 'Ethiopia',
    'ThreeLetterSymbol': 'eth'
  },
  {
    'Country': 'Faeroe Islands',
    'ThreeLetterSymbol': 'fro'
  },
  {
    'Country': 'Falkland Islands',
    'ThreeLetterSymbol': 'flk'
  },
  {
    'Country': 'Fiji',
    'ThreeLetterSymbol': 'fji'
  },
  {
    'Country': 'Finland',
    'ThreeLetterSymbol': 'fin'
  },
  {
    'Country': 'France',
    'ThreeLetterSymbol': 'fra'
  },
  {
    'Country': 'French Guiana',
    'ThreeLetterSymbol': 'guf'
  },
  {
    'Country': 'French Polynesia',
    'ThreeLetterSymbol': 'pyf'
  },
  {
    'Country': 'Gabon',
    'ThreeLetterSymbol': 'gab'
  },
  {
    'Country': 'Gambia',
    'ThreeLetterSymbol': 'gmb'
  },
  {
    'Country': 'Georgia',
    'ThreeLetterSymbol': 'geo'
  },
  {
    'Country': 'Germany',
    'ThreeLetterSymbol': 'deu'
  },
  {
    'Country': 'Ghana',
    'ThreeLetterSymbol': 'gha'
  },
  {
    'Country': 'Gibraltar',
    'ThreeLetterSymbol': 'gib'
  },
  {
    'Country': 'Greece',
    'ThreeLetterSymbol': 'grc'
  },
  {
    'Country': 'Greenland',
    'ThreeLetterSymbol': 'grl'
  },
  {
    'Country': 'Grenada',
    'ThreeLetterSymbol': 'grd'
  },
  {
    'Country': 'Guadeloupe',
    'ThreeLetterSymbol': 'glp'
  },
  {
    'Country': 'Guatemala',
    'ThreeLetterSymbol': 'gtm'
  },
  {
    'Country': 'Guinea',
    'ThreeLetterSymbol': 'gin'
  },
  {
    'Country': 'Guinea-Bissau',
    'ThreeLetterSymbol': 'gnb'
  },
  {
    'Country': 'Guyana',
    'ThreeLetterSymbol': 'guy'
  },
  {
    'Country': 'Haiti',
    'ThreeLetterSymbol': 'hti'
  },
  {
    'Country': 'Honduras',
    'ThreeLetterSymbol': 'hnd'
  },
  {
    'Country': 'Hong Kong',
    'ThreeLetterSymbol': 'hkg'
  },
  {
    'Country': 'Hungary',
    'ThreeLetterSymbol': 'hun'
  },
  {
    'Country': 'Iceland',
    'ThreeLetterSymbol': 'isl'
  },
  {
    'Country': 'India',
    'ThreeLetterSymbol': 'ind'
  },
  {
    'Country': 'Indonesia',
    'ThreeLetterSymbol': 'idn'
  },
  {
    'Country': 'Iran',
    'ThreeLetterSymbol': 'irn'
  },
  {
    'Country': 'Iraq',
    'ThreeLetterSymbol': 'irq'
  },
  {
    'Country': 'Ireland',
    'ThreeLetterSymbol': 'irl'
  },
  {
    'Country': 'Isle of Man',
    'ThreeLetterSymbol': 'imn'
  },
  {
    'Country': 'Israel',
    'ThreeLetterSymbol': 'isr'
  },
  {
    'Country': 'Italy',
    'ThreeLetterSymbol': 'ita'
  },
  {
    'Country': 'Ivory Coast',
    'ThreeLetterSymbol': 'civ'
  },
  {
    'Country': 'Jamaica',
    'ThreeLetterSymbol': 'jam'
  },
  {
    'Country': 'Japan',
    'ThreeLetterSymbol': 'jpn'
  },
  {
    'Country': 'Jordan',
    'ThreeLetterSymbol': 'jor'
  },
  {
    'Country': 'Kazakhstan',
    'ThreeLetterSymbol': 'kaz'
  },
  {
    'Country': 'Kenya',
    'ThreeLetterSymbol': 'ken'
  },
  {
    'Country': 'Kuwait',
    'ThreeLetterSymbol': 'kwt'
  },
  {
    'Country': 'Kyrgyzstan',
    'ThreeLetterSymbol': 'kgz'
  },
  {
    'Country': 'Laos',
    'ThreeLetterSymbol': 'lao'
  },
  {
    'Country': 'Latvia',
    'ThreeLetterSymbol': 'lva'
  },
  {
    'Country': 'Lebanon',
    'ThreeLetterSymbol': 'lbn'
  },
  {
    'Country': 'Lesotho',
    'ThreeLetterSymbol': 'lso'
  },
  {
    'Country': 'Liberia',
    'ThreeLetterSymbol': 'lbr'
  },
  {
    'Country': 'Libya',
    'ThreeLetterSymbol': 'lby'
  },
  {
    'Country': 'Liechtenstein',
    'ThreeLetterSymbol': 'lie'
  },
  {
    'Country': 'Lithuania',
    'ThreeLetterSymbol': 'ltu'
  },
  {
    'Country': 'Luxembourg',
    'ThreeLetterSymbol': 'lux'
  },
  {
    'Country': 'MS Zaandam',
    'ThreeLetterSymbol': 'usa'
  },
  {
    'Country': 'Macao',
    'ThreeLetterSymbol': 'mac'
  },
  {
    'Country': 'Madagascar',
    'ThreeLetterSymbol': 'mdg'
  },
  {
    'Country': 'Malawi',
    'ThreeLetterSymbol': 'mwi'
  },
  {
    'Country': 'Malaysia',
    'ThreeLetterSymbol': 'mys'
  },
  {
    'Country': 'Maldives',
    'ThreeLetterSymbol': 'mdv'
  },
  {
    'Country': 'Mali',
    'ThreeLetterSymbol': 'mli'
  },
  {
    'Country': 'Malta',
    'ThreeLetterSymbol': 'mlt'
  },
  {
    'Country': 'Marshall Islands',
    'ThreeLetterSymbol': 'mhl'
  },
  {
    'Country': 'Martinique',
    'ThreeLetterSymbol': 'mtq'
  },
  {
    'Country': 'Mauritania',
    'ThreeLetterSymbol': 'mrt'
  },
  {
    'Country': 'Mauritius',
    'ThreeLetterSymbol': 'mus'
  },
  {
    'Country': 'Mayotte',
    'ThreeLetterSymbol': 'myt'
  },
  {
    'Country': 'Mexico',
    'ThreeLetterSymbol': 'mex'
  },
  {
    'Country': 'Moldova',
    'ThreeLetterSymbol': 'mda'
  },
  {
    'Country': 'Monaco',
    'ThreeLetterSymbol': 'mco'
  },
  {
    'Country': 'Mongolia',
    'ThreeLetterSymbol': 'mng'
  },
  {
    'Country': 'Montenegro',
    'ThreeLetterSymbol': 'mne'
  },
  {
    'Country': 'Montserrat',
    'ThreeLetterSymbol': 'msr'
  },
  {
    'Country': 'Morocco',
    'ThreeLetterSymbol': 'mar'
  },
  {
    'Country': 'Mozambique',
    'ThreeLetterSymbol': 'moz'
  },
  {
    'Country': 'Myanmar',
    'ThreeLetterSymbol': 'mmr'
  },
  {
    'Country': 'Namibia',
    'ThreeLetterSymbol': 'nam'
  },
  {
    'Country': 'Nepal',
    'ThreeLetterSymbol': 'npl'
  },
  {
    'Country': 'Netherlands',
    'ThreeLetterSymbol': 'nld'
  },
  {
    'Country': 'New Caledonia',
    'ThreeLetterSymbol': 'ncl'
  },
  {
    'Country': 'New Zealand',
    'ThreeLetterSymbol': 'nzl'
  },
  {
    'Country': 'Nicaragua',
    'ThreeLetterSymbol': 'nic'
  },
  {
    'Country': 'Niger',
    'ThreeLetterSymbol': 'ner'
  },
  {
    'Country': 'Nigeria',
    'ThreeLetterSymbol': 'nga'
  },
  {
    'Country': 'North Macedonia',
    'ThreeLetterSymbol': 'mkd'
  },
  {
    'Country': 'Norway',
    'ThreeLetterSymbol': 'nor'
  },
  {
    'Country': 'Oman',
    'ThreeLetterSymbol': 'omn'
  },
  {
    'Country': 'Pakistan',
    'ThreeLetterSymbol': 'pak'
  },
  {
    'Country': 'Palestine',
    'ThreeLetterSymbol': 'pse'
  },
  {
    'Country': 'Panama',
    'ThreeLetterSymbol': 'pan'
  },
  {
    'Country': 'Papua New Guinea',
    'ThreeLetterSymbol': 'png'
  },
  {
    'Country': 'Paraguay',
    'ThreeLetterSymbol': 'pry'
  },
  {
    'Country': 'Peru',
    'ThreeLetterSymbol': 'per'
  },
  {
    'Country': 'Philippines',
    'ThreeLetterSymbol': 'phl'
  },
  {
    'Country': 'Poland',
    'ThreeLetterSymbol': 'pol'
  },
  {
    'Country': 'Portugal',
    'ThreeLetterSymbol': 'prt'
  },
  {
    'Country': 'Qatar',
    'ThreeLetterSymbol': 'qat'
  },
  {
    'Country': 'Romania',
    'ThreeLetterSymbol': 'rou'
  },
  {
    'Country': 'Russia',
    'ThreeLetterSymbol': 'rus'
  },
  {
    'Country': 'Rwanda',
    'ThreeLetterSymbol': 'rwa'
  },
  {
    'Country': 'Réunion',
    'ThreeLetterSymbol': 'reu'
  },
  {
    'Country': 'S. Korea',
    'ThreeLetterSymbol': 'kor'
  },
  {
    'Country': 'Saint Kitts and Nevis',
    'ThreeLetterSymbol': 'kna'
  },
  {
    'Country': 'Saint Lucia',
    'ThreeLetterSymbol': 'lca'
  },
  {
    'Country': 'Saint Martin',
    'ThreeLetterSymbol': 'maf'
  },
  {
    'Country': 'Saint Pierre Miquelon',
    'ThreeLetterSymbol': 'spm'
  },
  {
    'Country': 'Samoa',
    'ThreeLetterSymbol': 'wsm'
  },
  {
    'Country': 'San Marino',
    'ThreeLetterSymbol': 'smr'
  },
  {
    'Country': 'Sao Tome and Principe',
    'ThreeLetterSymbol': 'stp'
  },
  {
    'Country': 'Saudi Arabia',
    'ThreeLetterSymbol': 'sau'
  },
  {
    'Country': 'Senegal',
    'ThreeLetterSymbol': 'sen'
  },
  {
    'Country': 'Serbia',
    'ThreeLetterSymbol': 'srb'
  },
  {
    'Country': 'Seychelles',
    'ThreeLetterSymbol': 'syc'
  },
  {
    'Country': 'Sierra Leone',
    'ThreeLetterSymbol': 'sle'
  },
  {
    'Country': 'Singapore',
    'ThreeLetterSymbol': 'sgp'
  },
  {
    'Country': 'Sint Maarten',
    'ThreeLetterSymbol': 'sxm'
  },
  {
    'Country': 'Slovakia',
    'ThreeLetterSymbol': 'svk'
  },
  {
    'Country': 'Slovenia',
    'ThreeLetterSymbol': 'svn'
  },
  {
    'Country': 'Solomon Islands',
    'ThreeLetterSymbol': 'slb'
  },
  {
    'Country': 'Somalia',
    'ThreeLetterSymbol': 'som'
  },
  {
    'Country': 'South Africa',
    'ThreeLetterSymbol': 'zaf'
  },
  {
    'Country': 'South Sudan',
    'ThreeLetterSymbol': 'ssd'
  },
  {
    'Country': 'Spain',
    'ThreeLetterSymbol': 'esp'
  },
  {
    'Country': 'Sri Lanka',
    'ThreeLetterSymbol': 'lka'
  },
  {
    'Country': 'St. Barth',
    'ThreeLetterSymbol': 'blm'
  },
  {
    'Country': 'St. Vincent Grenadines',
    'ThreeLetterSymbol': 'vct'
  },
  {
    'Country': 'Sudan',
    'ThreeLetterSymbol': 'sdn'
  },
  {
    'Country': 'Suriname',
    'ThreeLetterSymbol': 'sur'
  },
  {
    'Country': 'Sweden',
    'ThreeLetterSymbol': 'swe'
  },
  {
    'Country': 'Switzerland',
    'ThreeLetterSymbol': 'che'
  },
  {
    'Country': 'Syria',
    'ThreeLetterSymbol': 'syr'
  },
  {
    'Country': 'Taiwan',
    'ThreeLetterSymbol': 'twn'
  },
  {
    'Country': 'Tajikistan',
    'ThreeLetterSymbol': 'tjk'
  },
  {
    'Country': 'Tanzania',
    'ThreeLetterSymbol': 'tza'
  },
  {
    'Country': 'Thailand',
    'ThreeLetterSymbol': 'tha'
  },
  {
    'Country': 'Timor-Leste',
    'ThreeLetterSymbol': 'tls'
  },
  {
    'Country': 'Togo',
    'ThreeLetterSymbol': 'tgo'
  },
  {
    'Country': 'Trinidad and Tobago',
    'ThreeLetterSymbol': 'tto'
  },
  {
    'Country': 'Tunisia',
    'ThreeLetterSymbol': 'tun'
  },
  {
    'Country': 'Turkey',
    'ThreeLetterSymbol': 'tur'
  },
  {
    'Country': 'Turks and Caicos',
    'ThreeLetterSymbol': 'tca'
  },
  {
    'Country': 'UAE',
    'ThreeLetterSymbol': 'are'
  },
  {
    'Country': 'UK',
    'ThreeLetterSymbol': 'gbr'
  },
  {
    'Country': 'USA',
    'ThreeLetterSymbol': 'usa'
  },
  {
    'Country': 'Uganda',
    'ThreeLetterSymbol': 'uga'
  },
  {
    'Country': 'Ukraine',
    'ThreeLetterSymbol': 'ukr'
  },
  {
    'Country': 'Uruguay',
    'ThreeLetterSymbol': 'ury'
  },
  {
    'Country': 'Uzbekistan',
    'ThreeLetterSymbol': 'uzb'
  },
  {
    'Country': 'Vanuatu',
    'ThreeLetterSymbol': 'vut'
  },
  {
    'Country': 'Vatican City',
    'ThreeLetterSymbol': 'vat'
  },
  {
    'Country': 'Venezuela',
    'ThreeLetterSymbol': 'ven'
  },
  {
    'Country': 'Vietnam',
    'ThreeLetterSymbol': 'vnm'
  },
  {
    'Country': 'Wallis and Futuna',
    'ThreeLetterSymbol': 'wlf'
  },
  {
    'Country': 'Western Sahara',
    'ThreeLetterSymbol': 'esh'
  },
  {
    'Country': 'Yemen',
    'ThreeLetterSymbol': 'yem'
  },
  {
    'Country': 'Zambia',
    'ThreeLetterSymbol': 'zmb'
  },
  {
    'Country': 'Zimbabwe',
    'ThreeLetterSymbol': 'zwe'
  }
];

const object = isoCodes.reduce(
  (obj, item) => Object.assign(obj, { [item.Country]: item.ThreeLetterSymbol.toUpperCase() }), {});

export default object;
  