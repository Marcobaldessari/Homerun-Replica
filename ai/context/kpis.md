# Key Performance Indicators (KPIs)

Core driver metrics

**Source**: [Homerun Goals](https://docs.google.com/spreadsheets/d/1Wf7Lc94YkAaT1YDjCKnEpgkLsbEE7r8y00rgel8GSAo/edit?gid=119972758#gid=119972758)

---

## Consumer Acquisition

### Acquired Consumers

**Definition:** Number of customers creating their first job request  
**Overlaps with:** Requests  
**Dependencies:** Request creation Login Conversion, Consumer Sign up Conversion  
**Track:** [Redash Query](https://redash.in.armut.com/queries/628/source)

---

### Consumer Sign up Conversion

**Definition:** Completed Sign Ups / Attempts  
**Track:** [Redash Query](https://redash.in.armut.com/queries/17326/source)

---

### Request Creation Login Conversion

**Definition:** Login_success / Email Password viewed  
**Track:** [Redash Query](https://redash.in.armut.com/queries/17325/source)

---

## Pro Acquisition

### Acquired Pros

**Definition:** Number of providers signing up  
**Dependencies:** Pro Sign up Conversion  
**Track:** [Redash Query](https://redash.in.armut.com/queries/14383/source)

---

### Pro Sign up Conversion

**Definition:** Completed Sign Ups / Attempts  
**Track:** [Redash Query](https://redash.in.armut.com/queries/15910/source#33614)

---

### Total Pro Add Money Payment CR

**Definition:** _(TBD)_  
**Track:** [Redash Query](https://redash.in.armut.com/queries/19028/source)

---

## Engagement Metrics

### Requests

**Definition:** Number of Requests  
**Overlaps with:** Acquired Consumers  
**Dependencies:** Request creation Login Conversion, Consumer Sign up Conversion  
**Track:** [Google Sheets](https://docs.google.com/spreadsheets/d/1jidAAmYlfF4Qwav4rNUMZSL_v9kSMuQVS0E16lzW7bc/edit#gid=120470235)

---

### Quote Rate

**Definition:** Quoted Requests over Total Requests  
**Track:** [Redash Dashboard](https://redash.in.armut.com/dashboards/276-marketplace-checks-bm1-?p_w5031_countryname=Romania&p_w5032_countryname=Romania&p_w5033_countryname=T%C3%BCrkiye&p_w5040_category=%27Not%20Managed%27&p_w5043_countryid=9&p_w5044_Countries=%5B%22Romania%22%2C%22Egypt%22%2C%22Saudi%20Arabia%22%2C%22United%20Kingdom%22%2C%22Hungary%22%2C%22Poland%22%2C%22Czechia%22%5D&p_w5044_DATE=d_last_month&refresh=86400)

---

### Clicks/Send Email

**Definition:** Clicks / Sent Emails  
**Track:** [Redash Query](https://redash.in.armut.com/queries/15959/source)

---

### Opened/Send Push

**Definition:** Messages tapped / Sent Push notifications  
**Track:** _(TBD)_

---

## KPI Relationships

```
Acquired Consumers → depends on → Request creation Login Conversion, Consumer Sign up Conversion
                   ↓
                Requests (overlaps)

Acquired Pros → depends on → Pro Sign up Conversion

Requests → influences → Quote Rate
```

---

**Last updated:** 2025-10-19  
**Source:** Exported from Google Sheets → `kpis.csv`
