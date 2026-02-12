# Decisions Tracker

> **Deviation log for human review.** This file records choices that shaped the implementation — where the team deviated from the plan, made choices the plan left open, or added/changed scope. A human reads this after the session to diff "what I asked for" vs "what I got."

---

## How to Use

When you make a choice that a human comparing the plan to the implementation should know about:
1. Add a new entry below using the template
2. Increment the decision number
3. Fill all fields — no field should be empty

**What to record:**
- You deviated from what the plan specified
- You made a choice the plan left open / didn't specify
- You added, removed, or changed scope
- You made a tradeoff (chose A over B)

**What NOT to record:**
- Routine implementation that follows the plan exactly
- Discussion that didn't result in a choice
- Intermediate steps that led to the final decision

**Check this file before proposing changes** — settled decisions should not be re-litigated unless new information emerges.

---

## Template

```markdown
## Decision #N: [Brief Title]

| Field | Value |
|-------|-------|
| **Category** | Architecture / Security / Implementation / Quality / Scope |
| **Timestamp** | [HH:MM:SS] from conversation.txt |
| **What the plan said** | [quote or summary from plan, or "Not specified"] |
| **What we did** | [the actual choice made] |
| **Why** | [brief rationale] |
| **Decided by** | @[role] |
```

---

## Decisions

<!-- Add new decisions below this line -->

## Decision #1: Counter Seed Value and Copy Adjustment

| Field | Value |
|-------|-------|
| **Category** | Scope |
| **Timestamp** | [16:48:09] |
| **What the plan said** | "Seed the counter at a reasonable number (e.g., 47)" and use copy "Join X musicians waiting for Transpose" |
| **What we did** | Start counter at `0`. Use copy "Be among the first to know" instead of "Join X musicians waiting" |
| **Why** | Showing a fake seed number (47 when there are 0 signups) is deceptive. Starting at 0 with aspirational framing maintains integrity while still providing social proof context. |
| **Decided by** | @PM (with input from @Security, @Designer) |

## Decision #2: --text-muted Color Adjustment for WCAG AA Compliance

| Field | Value |
|-------|-------|
| **Category** | Quality |
| **Timestamp** | [16:48:09] |
| **What the plan said** | `--text-muted: #6b6b80` |
| **What we did** | Changed to `--text-muted: #7a7a90` |
| **Why** | Original color (#6b6b80) has 4.37:1 contrast ratio against --bg-primary (#0a0a0f), which fails WCAG AA for body text (requires 4.5:1). New color (#7a7a90) achieves 5.1:1, passing AA for all text. Accessibility is a non-negotiable. |
| **Decided by** | @PM (with input from @Designer, @QA) |

## Decision #3: Include CSP Headers for Netlify and Vercel

| Field | Value |
|-------|-------|
| **Category** | Security |
| **Timestamp** | [16:48:09] |
| **What the plan said** | "zero-config deploy" — plan mentions CSP but doesn't specify implementation |
| **What we did** | Include both `_headers` (Netlify) and `vercel.json` (Vercel) with security headers in Phase 03.7 |
| **Why** | Security headers (CSP, X-Frame-Options, etc.) are important for production. Providing configs for both major platforms is value-add, not complexity. Core site still works without them. |
| **Decided by** | @PM (with input from @SRE, @Security) |

## Decision #4: Add Privacy Note to Feedback Form

| Field | Value |
|-------|-------|
| **Category** | Scope |
| **Timestamp** | [16:48:09] |
| **What the plan said** | Not specified |
| **What we did** | Add single-line note under feedback form email field: "We'll only use your email to follow up on your feedback." |
| **Why** | Low effort, high trust. Good practice even for a validation landing page. Addresses @Security's concern about PII handling transparency. |
| **Decided by** | @PM (with input from @Security) |

## Decision #5: Add font-display: swap in Phase 01

| Field | Value |
|-------|-------|
| **Category** | Implementation |
| **Timestamp** | [16:48:09] |
| **What the plan said** | Add `font-display: swap` to Google Fonts URL in Phase 03 (performance/meta task) |
| **What we did** | Add it in Phase 01 instead |
| **Why** | Best practice with no downside. Prevents FOUT (Flash of Unstyled Text) from the start. |
| **Decided by** | @PM (with input from @Dev) |

## Decision #6: Add maxlength Attributes to Form Inputs

| Field | Value |
|-------|-------|
| **Category** | Security |
| **Timestamp** | [16:47:25] |
| **What the plan said** | Not specified |
| **What we did** | Add `maxlength` attributes: email=254, textareas=2000, other instruments=100 |
| **Why** | Prevents abuse via excessively long inputs. RFC 5321 limit for email. @Security recommendation. |
| **Decided by** | @Security (approved by @PM) |

## Decision #7: Rename Interest Form Input to Avoid DOM Property Collision

| Field | Value |
|-------|-------|
| **Category** | Implementation |
| **Timestamp** | [18:53:44] |
| **What the plan said** | Use `<input type="hidden" name="action" value="interest_click">` |
| **What we did** | Changed to `<input type="hidden" name="event_type" value="interest_click">` |
| **Why** | The `name="action"` attribute shadowed the `form.action` DOM property, causing JS to fail when calling `interestForm.action` (returned the input element instead of URL). @QA discovered this bug during regression testing. Renaming to `event_type` fixes the collision. |
| **Decided by** | @Dev (fix for bug found by @QA) |
