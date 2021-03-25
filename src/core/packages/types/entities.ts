import { ISOString } from '../../../shared/models/date-time';

type PackageId = string;

export type TrackPackageParams =
  | {
      carrierCode: string;
      trackingNumber: string;
    }
  | {
      packageId: PackageId;
    };

export interface TrackPackageResult {
  events: Event[];
  package: Package;
  shipment: Shipment;
}

export interface Event {
  carrierDateTime: ISOString;
  carrierDetailCode?: string;
  carrierStatusCode: string;
  dateTime: ISOString;
  description: string;
  location?: Location;
  signer?: string;
  status: Status;
}

export interface Location {
  cityLocality?: string;
  coordinates?: GeoCoordinates;
  countryCode?: CountryCode;
  postalCode?: string;
  stateProvince?: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export enum CountryCode {
  AE = 'AE',
  AF = 'AF',
  AI = 'AI',
  Ad = 'AD',
  Ag = 'AG',
  Al = 'AL',
  Am = 'AM',
  Ao = 'AO',
  Aq = 'AQ',
  Ar = 'AR',
  As = 'AS',
  At = 'AT',
  Au = 'AU',
  Aw = 'AW',
  Ax = 'AX',
  Az = 'AZ',
  BI = 'BI',
  BT = 'BT',
  BW = 'BW',
  Ba = 'BA',
  Bb = 'BB',
  Bd = 'BD',
  Be = 'BE',
  Bf = 'BF',
  Bg = 'BG',
  Bh = 'BH',
  Bj = 'BJ',
  Bl = 'BL',
  Bm = 'BM',
  Bn = 'BN',
  Bo = 'BO',
  Br = 'BR',
  Bs = 'BS',
  Bv = 'BV',
  By = 'BY',
  Bz = 'BZ',
  CA = 'CA',
  CD = 'CD',
  CF = 'CF',
  CG = 'CG',
  CM = 'CM',
  CN = 'CN',
  CR = 'CR',
  Cc = 'CC',
  Ch = 'CH',
  Ci = 'CI',
  Ck = 'CK',
  Cl = 'CL',
  Co = 'CO',
  Cu = 'CU',
  Cv = 'CV',
  Cx = 'CX',
  Cy = 'CY',
  Cz = 'CZ',
  De = 'DE',
  Dj = 'DJ',
  Dk = 'DK',
  Dm = 'DM',
  Do = 'DO',
  Dz = 'DZ',
  Ec = 'EC',
  Ee = 'EE',
  Eg = 'EG',
  Eh = 'EH',
  Er = 'ER',
  Es = 'ES',
  Et = 'ET',
  Fi = 'FI',
  Fj = 'FJ',
  Fk = 'FK',
  Fm = 'FM',
  Fo = 'FO',
  Fr = 'FR',
  GB = 'GB',
  Ga = 'GA',
  Gd = 'GD',
  Ge = 'GE',
  Gf = 'GF',
  Gg = 'GG',
  Gh = 'GH',
  Gi = 'GI',
  Gl = 'GL',
  Gm = 'GM',
  Gn = 'GN',
  Gp = 'GP',
  Gq = 'GQ',
  Gr = 'GR',
  Gs = 'GS',
  Gt = 'GT',
  Gu = 'GU',
  Gw = 'GW',
  Gy = 'GY',
  HT = 'HT',
  Hk = 'HK',
  Hm = 'HM',
  Hn = 'HN',
  Hr = 'HR',
  Hu = 'HU',
  ID = 'ID',
  IL = 'IL',
  IM = 'IM',
  IR = 'IR',
  Ie = 'IE',
  In = 'IN',
  Io = 'IO',
  Iq = 'IQ',
  Is = 'IS',
  It = 'IT',
  Je = 'JE',
  Jm = 'JM',
  Jo = 'JO',
  Jp = 'JP',
  KM = 'KM',
  Ke = 'KE',
  Kg = 'KG',
  Kh = 'KH',
  Ki = 'KI',
  Kn = 'KN',
  Kr = 'KR',
  Kw = 'KW',
  Ky = 'KY',
  Kz = 'KZ',
  LB = 'LB',
  LV = 'LV',
  La = 'LA',
  Lc = 'LC',
  Li = 'LI',
  Lk = 'LK',
  Lr = 'LR',
  Ls = 'LS',
  Lt = 'LT',
  Lu = 'LU',
  Ly = 'LY',
  MF = 'MF',
  MS = 'MS',
  MT = 'MT',
  MX = 'MX',
  Ma = 'MA',
  Mc = 'MC',
  Md = 'MD',
  Me = 'ME',
  Mg = 'MG',
  Mh = 'MH',
  Mk = 'MK',
  Ml = 'ML',
  Mm = 'MM',
  Mn = 'MN',
  Mo = 'MO',
  Mp = 'MP',
  Mq = 'MQ',
  Mr = 'MR',
  Mu = 'MU',
  Mv = 'MV',
  Mw = 'MW',
  My = 'MY',
  Mz = 'MZ',
  NI = 'NI',
  NP = 'NP',
  Na = 'NA',
  Nc = 'NC',
  Ne = 'NE',
  Nf = 'NF',
  Ng = 'NG',
  Nl = 'NL',
  No = 'NO',
  Nr = 'NR',
  Nu = 'NU',
  Nz = 'NZ',
  Om = 'OM',
  PE = 'PE',
  PG = 'PG',
  PR = 'PR',
  PS = 'PS',
  Pa = 'PA',
  Pf = 'PF',
  Ph = 'PH',
  Pk = 'PK',
  Pl = 'PL',
  Pm = 'PM',
  Pn = 'PN',
  Pt = 'PT',
  Pw = 'PW',
  Py = 'PY',
  QA = 'QA',
  Re = 'RE',
  Ro = 'RO',
  Rs = 'RS',
  Ru = 'RU',
  Rw = 'RW',
  SD = 'SD',
  SE = 'SE',
  Sa = 'SA',
  Sb = 'SB',
  Sc = 'SC',
  Sg = 'SG',
  Sh = 'SH',
  Si = 'SI',
  Sj = 'SJ',
  Sk = 'SK',
  Sl = 'SL',
  Sm = 'SM',
  Sn = 'SN',
  So = 'SO',
  Sr = 'SR',
  St = 'ST',
  Sv = 'SV',
  Sy = 'SY',
  Sz = 'SZ',
  Tc = 'TC',
  Td = 'TD',
  Tf = 'TF',
  Tg = 'TG',
  Th = 'TH',
  Tj = 'TJ',
  Tk = 'TK',
  Tl = 'TL',
  Tm = 'TM',
  Tn = 'TN',
  To = 'TO',
  Tr = 'TR',
  Tt = 'TT',
  Tv = 'TV',
  Tw = 'TW',
  Tz = 'TZ',
  Ua = 'UA',
  Ug = 'UG',
  Um = 'UM',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  VG = 'VG',
  Va = 'VA',
  Vc = 'VC',
  Ve = 'VE',
  Vi = 'VI',
  Vn = 'VN',
  Vu = 'VU',
  Wf = 'WF',
  Ws = 'WS',
  Ye = 'YE',
  Yt = 'YT',
  Za = 'ZA',
  Zm = 'ZM',
  Zw = 'ZW',
}

export enum Status {
  Accepted = 'ACCEPTED',
  AttemptedDelivery = 'ATTEMPTED DELIVERY',
  Delivered = 'DELIVERED',
  Exception = 'EXCEPTION',
  InTransit = 'IN TRANSIT',
  Unknown = 'UNKNOWN',
}

export interface Package {
  dimensions?: Dimensions;
  packageid?: string;
  trackingNumber: string;
  trackingurl?: string;
  weight?: Weight;
}

export interface Dimensions {
  height: number;
  length: number;
  unit: DimensionsUnit;
  width: number;
}

export enum DimensionsUnit {
  Centimeter = 'CENTIMETER',
  Inch = 'INCH',
}

export interface Weight {
  unit: WeightUnit;
  value: number;
}

export enum WeightUnit {
  Gram = 'GRAM',
  Kilogram = 'KILOGRAM',
  Ounce = 'OUNCE',
  Pound = 'POUND',
}

export interface Shipment {
  carrierCode: CarrierCode;
  carrierid?: string;
  estimatedDelivery: string;
  shipmentid?: string;
}

export enum CarrierCode {
  AccessWorldwide = 'ACCESS WORLDWIDE',
  AmazonBuyShipping = 'AMAZON BUY SHIPPING',
  AmazonShippingUk = 'AMAZON SHIPPING UK',
  Apc = 'APC',
  Asendia = 'ASENDIA',
  AustraliaPost = 'AUSTRALIA POST',
  CanadaPost = 'CANADA POST',
  DhlEcommerce = 'DHL ECOMMERCE',
  DhlExpress = 'DHL EXPRESS',
  DhlExpressAustralia = 'DHL EXPRESS AUSTRALIA',
  DhlExpressCanada = 'DHL EXPRESS CANADA',
  DhlExpressUk = 'DHL EXPRESS UK',
  Dpd = 'DPD',
  Endicia = 'ENDICIA',
  Fedex = 'FEDEX',
  FedexUk = 'FEDEX UK',
  Firstmile = 'FIRSTMILE',
  Globegistics = 'GLOBEGISTICS',
  Imex = 'IMEX',
  Newgistics = 'NEWGISTICS',
  OnTrac = 'ON TRAC',
  PurolatorCanada = 'PUROLATOR CANADA',
  RoyalMail = 'ROYAL MAIL',
  RrDonnelley = 'RR DONNELLEY',
  Seko = 'SEKO',
  Sendle = 'SENDLE',
  StampsCOM = 'STAMPS.COM',
  UPS = 'UPS',
  Usps = 'USPS',
}
