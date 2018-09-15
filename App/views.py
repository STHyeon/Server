from django.shortcuts import render, redirect
from django.contrib.auth import login as django_login, logout as django_logout, authenticate

from .forms import LoginForm, RegisterForm, PostForm
from .models import Post

'''
def post(request):
    post = Post.objects.prefetch_related('tag').select_related('author__profile').all()

    return render(request,'')'''

def login(request):
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data['username']
            password = login_form.cleaned_data['password']

            user = authenticate(
                username=username,
                password=password
            )
            
            if user:
                django_login(request, user)
                return redirect('main')

            login_form.add_error(None, '아이디 또는 비밀번호가 올바르지 않습니다')
    else:
        login_form = LoginForm()
    context = {
        'login_form': login_form,
    }
    return render(request, 'html/login.html', context)

def register(request):
    if request.method == 'POST':
        signup_form = RegisterForm(request.POST)

        if signup_form.is_valid():
            signup_form.signup()
            return redirect('login')
    else:
        signup_form = RegisterForm()

    context = {
        'signup_form': signup_form,
    }
    return render(request, 'html/register.html', context)

def main(request):
    return render(request, 'html/main.html', {})

def logout(request):
    django_logout(request)
    return redirect('main')

def start(request):
    return render(request, 'html/start.html', {})
'''
def post(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('main')
    else:
        form = PostForm()
    return render(request, 'html/post.html',{'form': form})'''

def post(request):
    form = PostForm()
    return render(request, 'html/post.html', {'form':form})