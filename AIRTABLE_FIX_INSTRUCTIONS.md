# Airtable Data Fix - Instructions

## What Was Wrong

The site wasn't displaying any business data because of **two critical issues**:

### 1. **Expired Airtable API Key** (URGENT - Requires Action)
- The old API key (`keyUQtss54qPKS32W`) in [_plugins/airtable.rb.disabled](_plugins/airtable.rb.disabled) has expired
- Airtable deprecated API keys starting with "key" and now requires **Personal Access Tokens (PATs)**
- Direct API test confirmed: `401 Unauthorized: "Invalid authentication token"`

### 2. **Bug in index.html Template** (FIXED)
- [index.html:27](index.html#L27) was trying to access `business['resource']` which doesn't exist in the data structure
- **Fixed**: Removed the incorrect line that tried to access the non-existent 'resource' key
- [index.html:6](index.html#L6) was trying to sort categories including nil values
- **Fixed**: Added `compact` filter to remove nil values before sorting

## What Was Done

### Temporary Fix (Site is now working)
1. ✅ Disabled the Airtable plugin by renaming it to `_plugins/airtable.rb.disabled`
2. ✅ Restored business data from git history to `_data/airtable.yml`
3. ✅ Fixed the template bugs in [index.html](index.html)
4. ✅ Site now displays 93+ business listings correctly

### Current Status
- ✅ **Site is displaying data** from the restored `_data/airtable.yml` file
- ⚠️ **But data is stale** - it won't update from Airtable until you fix the API key
- 🔒 The plugin is disabled to prevent it from overwriting the restored data

## How to Permanently Fix (Update Airtable API Key)

### Step 1: Get a New Personal Access Token from Airtable

1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Name it something like "TRIBUS Directorio Jekyll Plugin"
4. Under "Scopes", select:
   - `data.records:read` (required to read records)
5. Under "Access", select your base:
   - Base: "DirectorioTribus" (Base ID: `appzux6XBDCjO151J`)
6. Click "Create token"
7. **Copy the token** (it starts with `pat`) - you won't be able to see it again!

### Step 2: Update the Plugin

1. Open [_plugins/airtable.rb.disabled](_plugins/airtable.rb.disabled)
2. Replace line 4:
   ```ruby
   # OLD (expired):
   @client = Airtable::Client.new('keyUQtss54qPKS32W')

   # NEW (use your PAT):
   @client = Airtable::Client.new('patXXXXXXXXXXXXXX')
   ```
3. Save the file

### Step 3: Test the Connection

```bash
# Rename the plugin back to enable it
mv _plugins/airtable.rb.disabled _plugins/airtable.rb

# Test fetching data
ruby _plugins/airtable.rb
```

You should see:
```
X records pulled from Airtable.  # (where X > 0)
Sanitizing records...
All records have been sanitized.
YAML database successfully created!
```

### Step 4: Rebuild and Deploy

```bash
# Build the site (will automatically fetch latest Airtable data)
bundle exec jekyll build

# Test locally
bundle exec jekyll serve
# Visit http://localhost:4000

# Deploy to Netlify
netlify deploy --prod --dir=_site
```

## Important Notes

### Security Warning
⚠️ The Airtable API token is currently **hardcoded** in the plugin file. This is a security risk if the repository is public.

**Recommended Fix**: Use environment variables instead:
```ruby
# In _plugins/airtable.rb
@client = Airtable::Client.new(ENV['AIRTABLE_API_TOKEN'])
```

Then set the environment variable:
- Locally: Add to `.env` file (and add `.env` to `.gitignore`)
- Netlify: Set in Site Settings → Environment Variables

### Data Update Workflow
- The plugin runs automatically during `jekyll build`
- To manually refresh data: `ruby _plugins/airtable.rb`
- The `_data/airtable.yml` file is auto-generated and will be overwritten

## Testing Checklist

After fixing the API key:
- [ ] Plugin fetches records successfully (`ruby _plugins/airtable.rb`)
- [ ] Site builds without errors (`bundle exec jekyll build`)
- [ ] Business listings display correctly (`bundle exec jekyll serve`)
- [ ] Category filters work
- [ ] Images/logos display
- [ ] Phone numbers are clickable
- [ ] Social media links work
- [ ] Deploy to Netlify works

## Files Modified

- [index.html](index.html) - Fixed template bugs (removed `business['resource']`, added `compact` filter)
- [_data/airtable.yml](_data/airtable.yml) - Restored with historical data
- [_plugins/airtable.rb](_plugins/airtable.rb) → Renamed to `.disabled` (needs API key update)

## Questions?

If you encounter issues:
1. Check that the PAT has the correct scopes
2. Verify the base ID is still `appzux6XBDCjO151J`
3. Confirm the table name is still `DirectorioTribus`
4. Check the Netlify build logs for errors
