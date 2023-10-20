l = {}
local answer

function l.init(text)
    local file = io.open("logs/latest.txt", "a")

    local contents = file:read(text + "\n")

    file:close()
end

print(arg)

l[arg[3]](arg[3])